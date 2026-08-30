"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The six parties an opportunity needs, gradually connecting.
 *
 * Deliberately quiet: hairline strokes, no glow, no particles, one pass and
 * then it settles. It is a diagram that happens to animate, not an effect.
 */

type Node = { id: string; label: string; x: number; y: number };

const nodes: Node[] = [
  { id: "idea", label: "Idea", x: 90, y: 200 },
  { id: "founder", label: "Founder", x: 310, y: 96 },
  { id: "talent", label: "Talent", x: 300, y: 312 },
  { id: "investor", label: "Investor", x: 570, y: 70 },
  { id: "partner", label: "Partner", x: 590, y: 246 },
  { id: "customer", label: "Customer", x: 830, y: 160 },
];

const nodeById = Object.fromEntries(nodes.map((node) => [node.id, node]));

const edges: Array<[string, string]> = [
  ["idea", "founder"],
  ["idea", "talent"],
  ["founder", "talent"],
  ["founder", "investor"],
  ["founder", "partner"],
  ["talent", "partner"],
  ["investor", "partner"],
  ["partner", "customer"],
  ["investor", "customer"],
];

const NODE_DELAY = 0.09;
const EDGE_START = nodes.length * NODE_DELAY;
const EDGE_DELAY = 0.11;

function NetworkVisual({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={className} aria-hidden>
      <svg
        viewBox="0 0 920 400"
        fill="none"
        className="h-auto w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {edges.map(([fromId, toId], index) => {
            const from = nodeById[fromId];
            const to = nodeById[toId];

            return (
              <motion.line
                key={`${fromId}-${toId}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="currentColor"
                strokeWidth={1}
                className="text-foreground/22"
                initial={
                  reduceMotion ? false : { pathLength: 0, opacity: 0 }
                }
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: EDGE_START + index * EDGE_DELAY,
                  ease: [0.25, 1, 0.5, 1],
                }}
              />
            );
          })}
        </g>

        <g>
          {nodes.map((node, index) => {
            const isOrigin = node.id === "idea";

            return (
              <motion.g
                key={node.id}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.45,
                  delay: index * NODE_DELAY,
                  ease: "easeOut",
                }}
              >
                {/* Halo keeps the label legible where an edge passes behind it. */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={7}
                  className="fill-background"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isOrigin ? 4.5 : 3}
                  className={
                    isOrigin ? "fill-accent" : "fill-foreground/70"
                  }
                />
                {/* The SVG scales with its container, so a fixed user-unit
                    size would render at ~4px on a phone. These sizes are
                    chosen to land near 10px at every breakpoint, and the
                    em-based offset follows whichever size applies. */}
                <text
                  x={node.x}
                  y={node.y}
                  dy="-1.4em"
                  textAnchor="middle"
                  className="fill-muted-foreground font-mono text-[26px] tracking-[0.12em] uppercase sm:text-[15px] lg:text-[11px]"
                >
                  {node.label}
                </text>
              </motion.g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

export { NetworkVisual };
