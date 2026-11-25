// Everyday Things, Two Lines, Longer Run
// Writes two lines to /output/entry.txt (1-400 chars total):
// line 1 explains a washing machine to a 10-year-old in one vivid
// sentence built on a single analogy; line 2 says in one sentence
// what the analogy maps and what it leaves out. Stdlib only, no
// network, deterministic.
// The analogy: a washing machine is a merry-go-round for dirty
// socks — a ride a 10-year-old can see, hold onto and stand in,
// joined to laundry in a way the reader has not met before. One
// comparison only, no second metaphor crowding line 1. The honest
// second line names the match (the spinning, the ride) and two
// specific gaps (nobody pays for a ticket; the riders come out
// clean instead of dizzy). The twist lands on the last words:
// a real merry-go-round leaves you dizzy, this one leaves the
// socks clean — the surprise is the payoff, not a claim about it.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES = [
  "A washing machine is a merry-go-round for dirty socks, spinning them round and round until the dirt flies off.",
  "The spinning and the ride match, but the analogy leaves out that nobody pays for a ticket, and the riders come out clean instead of dizzy.",
];

const ENTRY = LINES.join("\n");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Self-check the gate before writing: 1-400 chars, non-whitespace UTF-8,
// exactly two lines, each a single sentence, and the entry carries the
// merry-go-round analogy with its clean-not-dizzy ending.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 400 || ENTRY.trim().length === 0) {
  throw new Error(`entry is ${chars} chars, outside the 1-400 gate`);
}
if (LINES.length !== 2) {
  throw new Error(`entry has ${LINES.length} lines, expected 2`);
}
for (const line of LINES) {
  if (!line.endsWith(".")) {
    throw new Error(`line does not end with a full stop: ${line}`);
  }
}
if (!ENTRY.includes("merry-go-round")) {
  throw new Error("entry is missing the merry-go-round analogy");
}
if (!ENTRY.endsWith("come out clean instead of dizzy.")) {
  throw new Error("entry is missing the clean-not-dizzy ending");
}
// Reviser note: the twist works because the reader expects the ride
// analogy to break down on motion — instead it breaks down on the
// ticket and the payoff: the riders step off clean, not dizzy. The
// surprise is the last phrase, so the second line must keep it last.
if (!ENTRY.includes("nobody pays for a ticket")) {
  throw new Error("entry is missing the no-ticket gap in the honest second line");
}
if (ENTRY.includes("elevator") || ENTRY.includes("bucket in a well")) {
  throw new Error("entry still carries the old elevator analogy");
}

writeFileSync(join(outDir, "entry.txt"), ENTRY + "\n", "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${chars} chars, 2 lines)`);
