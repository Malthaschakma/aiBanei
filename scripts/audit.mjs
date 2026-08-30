/**
 * Phase 1 verification harness.
 *
 * Captures each public route at the four target breakpoints, then runs three
 * automated checks that are easy to regress by hand: contrast of every text
 * node against its effective background, keyboard focus visibility, and
 * heading hierarchy.
 *
 * Not part of the app build. Run with the dev server up:
 *   node scripts/audit.mjs
 */

import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const OUT = "screenshots";

const routes = [
  ["home", "/"],
  ["explore", "/explore"],
  ["explore-filtered", "/explore?looking_for=capital&stage=revenue"],
  ["opportunity", "/opportunities/hillharvest"],
  ["how-it-works", "/how-it-works"],
  ["people", "/people"],
  ["capital", "/capital"],
  ["signup", "/signup"],
];

const breakpoints = [
  ["360", 360, 900],
  ["768", 768, 1024],
  ["1280", 1280, 900],
  ["1440", 1440, 900],
];

function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function luminance([r, g, b]) {
  return (
    0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b)
  );
}

function contrast(fg, bg) {
  const a = luminance(fg);
  const b = luminance(bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

function parseRgb(value) {
  const match = value.match(/rgba?\(([^)]+)\)/);
  if (!match) return null;
  const parts = match[1].split(/[,\s/]+/).filter(Boolean).map(Number);
  if (parts.length < 3 || parts.some(Number.isNaN)) return null;
  return { rgb: parts.slice(0, 3), alpha: parts.length > 3 ? parts[3] : 1 };
}

/** Walks up the tree for the first non-transparent background. */
const collectTextNodes = () => {
  const results = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const text = node.textContent?.trim();
    if (!text) continue;

    const el = node.parentElement;
    if (!el) continue;
    if (el.closest("svg")) continue;

    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) continue;

    const style = getComputedStyle(el);
    if (style.visibility === "hidden" || style.opacity === "0") continue;

    let bgEl = el;
    let background = "rgba(0, 0, 0, 0)";
    while (bgEl) {
      const bg = getComputedStyle(bgEl).backgroundColor;
      if (bg && !bg.startsWith("rgba(0, 0, 0, 0)")) {
        background = bg;
        break;
      }
      bgEl = bgEl.parentElement;
    }

    results.push({
      text: text.slice(0, 60),
      color: style.color,
      background,
      fontSize: parseFloat(style.fontSize),
      fontWeight: style.fontWeight,
      tag: el.tagName.toLowerCase(),
    });
  }
  return results;
};

const collectHeadings = () =>
  [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
    level: Number(h.tagName[1]),
    text: (h.textContent ?? "").trim().slice(0, 50),
  }));

async function main() {
  mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch();
  const problems = [];

  for (const [name, path] of routes) {
    for (const [label, width, height] of breakpoints) {
      const context = await browser.newContext({
        viewport: { width, height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();

      const consoleErrors = [];
      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("pageerror", (err) => consoleErrors.push(String(err)));

      await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
      // Let the hero network animation settle before capturing.
      await page.waitForTimeout(2200);

      await page.screenshot({
        path: `${OUT}/${name}-${label}.png`,
        fullPage: true,
      });

      for (const error of consoleErrors) {
        problems.push(`[console] ${name}@${label}: ${error}`);
      }

      // Horizontal overflow is the classic responsive failure.
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      if (overflow > 1) {
        problems.push(
          `[overflow] ${name}@${label}: page scrolls ${overflow}px horizontally`,
        );
      }

      if (label === "1280") {
        const nodes = await page.evaluate(collectTextNodes);
        const seen = new Set();

        for (const node of nodes) {
          const fg = parseRgb(node.color);
          const bg = parseRgb(node.background);
          if (!fg || !bg || fg.alpha < 0.95) continue;

          const ratio = contrast(fg.rgb, bg.rgb);
          const large =
            node.fontSize >= 24 ||
            (node.fontSize >= 18.66 && Number(node.fontWeight) >= 700);
          const required = large ? 3 : 4.5;

          if (ratio < required) {
            const key = `${node.color}|${node.background}|${large}`;
            if (seen.has(key)) continue;
            seen.add(key);
            problems.push(
              `[contrast] ${name}: ${ratio.toFixed(2)}:1 (needs ${required}) — "${node.text}" ${node.color} on ${node.background}`,
            );
          }
        }

        const headings = await page.evaluate(collectHeadings);
        if (headings.length > 0) {
          const h1Count = headings.filter((h) => h.level === 1).length;
          if (h1Count !== 1) {
            problems.push(`[headings] ${name}: ${h1Count} h1 elements`);
          }
          let previous = headings[0].level;
          for (const heading of headings.slice(1)) {
            if (heading.level > previous + 1) {
              problems.push(
                `[headings] ${name}: h${previous} followed by h${heading.level} ("${heading.text}")`,
              );
            }
            previous = heading.level;
          }
        }

        // Tab through the page and confirm every stop paints a focus ring.
        const focusIssues = await page.evaluate(() => {
          const focusable = [
            ...document.querySelectorAll(
              'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',
            ),
          ].filter((el) => el.getBoundingClientRect().width > 0);

          const bad = [];
          for (const el of focusable) {
            el.focus();
            const style = getComputedStyle(el);
            const hasOutline =
              style.outlineStyle !== "none" &&
              parseFloat(style.outlineWidth) > 0;
            const hasRing =
              style.boxShadow !== "none" || style.borderColor !== "transparent";
            if (!hasOutline && !hasRing) {
              bad.push(
                `${el.tagName.toLowerCase()}: ${(el.textContent ?? "").trim().slice(0, 30)}`,
              );
            }
          }
          return { total: focusable.length, bad };
        });

        if (focusIssues.bad.length > 0) {
          problems.push(
            `[focus] ${name}: ${focusIssues.bad.length}/${focusIssues.total} without a visible focus indicator — ${focusIssues.bad.slice(0, 3).join("; ")}`,
          );
        }
      }

      await context.close();
    }
    process.stdout.write(`captured ${name}\n`);
  }

  await browser.close();

  if (problems.length === 0) {
    console.log("\nNo issues found.");
  } else {
    console.log(`\n${problems.length} issue(s):\n`);
    for (const problem of problems) console.log(`  ${problem}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
