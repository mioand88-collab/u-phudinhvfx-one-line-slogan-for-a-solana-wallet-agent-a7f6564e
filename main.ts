import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-Line Slogan for a Solana Wallet Agent.
// The line casts the wallet agent as a helpful aide, not a vault of jargon:
// it pays the person you meant, keeps a record of it, and the "never pockets
// a tip" turn is the joke — a wallet that never dips into your pocket.
const SLOGAN =
  "Your Solana wallet's own helper: it pays who you mean, keeps the receipts, and never pockets a tip.";

// Gate: UTF-8 text, 1-140 characters, not only whitespace, single line,
// at most 20 words.
function validate(text: string): void {
  if (text.length < 1 || text.length > 140) {
    throw new Error(`slogan must be 1-140 characters, got ${text.length}`);
  }
  if (!text.trim()) {
    throw new Error("slogan must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("slogan must be a single line");
  }
  const words = text.trim().split(/\s+/);
  if (words.length > 20) {
    throw new Error(`slogan must be at most 20 words, got ${words.length}`);
  }
}

validate(SLOGAN);
const text = SLOGAN;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
