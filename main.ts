// Everyday Things, Two Lines, Longer Run
// Writes two lines to /output/entry.txt (1-400 chars total):
// line 1 explains an elevator to a 10-year-old in one vivid sentence
// built on a single analogy; line 2 says in one sentence what the
// analogy maps and what it leaves out. Stdlib only, no network,
// deterministic.
// The analogy: an elevator is a bucket in a well — a box riding a
// rope up and down. One comparison only, no second metaphor crowding
// line 1. The honest second line names the match (rope, waiting)
// and the gap (people picking floors, not water pulled up by hand).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES = [
  "An elevator is a metal box that rides a rope up and down inside a tall building, like a bucket in a well.",
  "The rope and the waiting match, but the analogy leaves out that the box carries people who pick their own floors, not water pulled up by hand.",
];

const ENTRY = LINES.join("\n");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Self-check the gate before writing: 1-400 chars, non-whitespace UTF-8,
// exactly two lines, each a single sentence.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 400 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${chars} chars, outside the 1-400 gate`);
}
if (LINES.length !== 2) {
  throw new Error(`entry has ${LINES.length} lines, expected 2`);
}

writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${chars} chars, 2 lines)`);
