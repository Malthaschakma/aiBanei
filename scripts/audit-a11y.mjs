/**
 * Focused checks that the breakpoint sweep in audit.mjs does not cover:
 * real keyboard traversal, reduced-motion rendering, and the no-JavaScript
 * fallback for Explore's filters.
 *
 * Run with the dev server up:
 *   node scripts/audit-a11y.mjs
 */

import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const problems = [];

function report(check, detail) {
  problems.push(`[${check}] ${detail}`);
}

/** Tabs through a page and records the reachable stops in order. */
async function tabOrder(page, limit = 80) {
  const stops = [];
  for (let i = 0; i < limit; i += 1) {
    await page.keyboard.press("Tab");
    const stop = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      // The dev-tools overlay is injected by Next and is not part of the app.
      if (el.tagName.toLowerCase() === "nextjs-portal") return { skip: true };
      const rect = el.getBoundingClientRect();
      return {
        tag: el.tagName.toLowerCase(),
        label:
          el.getAttribute("aria-label") ??
          (el.textContent ?? "").trim().slice(0, 40),
        offscreen: rect.width === 0 && rect.height === 0,
      };
    });
    if (!stop) break;
    if (!stop.skip) stops.push(stop);
  }
  return stops;
}

async function checkKeyboard(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();

  for (const path of ["/", "/explore", "/opportunities/hillharvest"]) {
    await page.goto(`${BASE}${path}`, { waitUntil: "networkidle" });
    const stops = await tabOrder(page);

    if (stops.length === 0) {
      report("keyboard", `${path}: nothing is reachable by Tab`);
      continue;
    }
    const hidden = stops.filter((s) => s.offscreen);
    if (hidden.length > 0) {
      report(
        "keyboard",
        `${path}: ${hidden.length} zero-size focus stop(s), e.g. ${hidden[0].tag} "${hidden[0].label}"`,
      );
    }
    const unlabelled = stops.filter((s) => s.label.length === 0);
    if (unlabelled.length > 0) {
      report(
        "keyboard",
        `${path}: ${unlabelled.length} focus stop(s) with no accessible name (${unlabelled
          .map((s) => s.tag)
          .join(", ")})`,
      );
    }
  }

  // The mobile filter sheet must be openable and closable from the keyboard.
  const mobile = await browser.newContext({ viewport: { width: 390, height: 800 } });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto(`${BASE}/explore`, { waitUntil: "networkidle" });

  const trigger = mobilePage.getByRole("button", { name: /Filters/ });
  await trigger.focus();
  await mobilePage.keyboard.press("Enter");
  await mobilePage.waitForTimeout(400);

  const dialog = mobilePage.getByRole("dialog");
  if ((await dialog.count()) === 0) {
    report("keyboard", "/explore: filter sheet did not open via Enter");
  } else {
    const focusInside = await mobilePage.evaluate(() => {
      const d = document.querySelector('[role="dialog"]');
      return d ? d.contains(document.activeElement) : false;
    });
    if (!focusInside) {
      report("keyboard", "/explore: focus not moved into the filter sheet");
    }

    await mobilePage.keyboard.press("Escape");
    await mobilePage.waitForTimeout(400);
    if ((await mobilePage.getByRole("dialog").count()) > 0) {
      report("keyboard", "/explore: filter sheet did not close on Escape");
    }

    const focusRestored = await mobilePage.evaluate(() =>
      (document.activeElement?.textContent ?? "").includes("Filters"),
    );
    if (!focusRestored) {
      report("keyboard", "/explore: focus not returned to the trigger on close");
    }
  }

  await context.close();
  await mobile.close();
}

async function checkReducedMotion(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  // No settling time on purpose: the end state must be there immediately.
  await page.waitForTimeout(150);

  const state = await page.evaluate(() => {
    const svg = document.querySelector('svg[viewBox="0 0 920 400"]');
    if (!svg) return null;
    const lines = [...svg.querySelectorAll("line")];
    const groups = [...svg.querySelectorAll("g > g")];
    return {
      lines: lines.length,
      invisibleLines: lines.filter(
        (l) => Number(getComputedStyle(l).opacity) < 0.99,
      ).length,
      invisibleGroups: groups.filter(
        (g) => Number(getComputedStyle(g).opacity) < 0.99,
      ).length,
    };
  });

  if (!state) {
    report("reduced-motion", "network visual not found on the homepage");
  } else if (state.lines === 0) {
    report("reduced-motion", "network visual rendered no edges");
  } else if (state.invisibleLines > 0 || state.invisibleGroups > 0) {
    report(
      "reduced-motion",
      `network visual starts transparent (${state.invisibleLines} edges, ${state.invisibleGroups} nodes) instead of showing the connected end state`,
    );
  }

  await context.close();
}

async function checkNoJavaScript(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(`${BASE}/explore?looking_for=capital`, {
    waitUntil: "domcontentloaded",
  });

  const cards = await page.locator("article").count();
  if (cards === 0) {
    report("no-js", "/explore rendered no opportunities without JavaScript");
  }

  const applied = await page.getByText(/filter applied/).count();
  if (applied === 0) {
    report("no-js", "/explore did not reflect the active filter without JavaScript");
  }

  await page.goto(`${BASE}/opportunities/hillharvest`, {
    waitUntil: "domcontentloaded",
  });
  if ((await page.getByRole("heading", { level: 1 }).count()) === 0) {
    report("no-js", "opportunity detail rendered no h1 without JavaScript");
  }

  await context.close();
}

async function main() {
  const browser = await chromium.launch();
  await checkKeyboard(browser);
  await checkReducedMotion(browser);
  await checkNoJavaScript(browser);
  await browser.close();

  if (problems.length === 0) {
    console.log("No issues found.");
  } else {
    console.log(`${problems.length} issue(s):\n`);
    for (const problem of problems) console.log(`  ${problem}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
