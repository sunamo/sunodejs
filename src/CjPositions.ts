import { join } from "path";
import { promises as fs } from "fs";
import { readAllLines, writeAllLines } from "./TF";
import { ElectronLoggerNode } from "./types/ElectronLoggerNode";

export const CJ_POSITIONS_DIR =
  "D:\\OneDrive\\sunamo\\ConsoleApp1\\Data\\cj\\CjPositions";

export const CJ_POSITION_FILES = {
  forMe: "ForMe.txt",
  notForMe: "NotForMe.txt",
  notRecognized: "NotRecognized.txt",
  js: "js.txt"
} as const;

export type CjPositionBucket = keyof typeof CJ_POSITION_FILES;
export type CjInterestBucket = "forMe" | "notForMe";

export interface CjPositionsSnapshot {
  forMe: string[];
  notForMe: string[];
  notRecognized: string[];
  js: string[];
  dir: string;
}

export function normalizePosition(raw: string): string {
  return String(raw || "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/1+$/, "")
    .trimEnd();
}

export function cjPositionFilePath(bucket: CjPositionBucket, dir = CJ_POSITIONS_DIR): string {
  return join(dir, CJ_POSITION_FILES[bucket]);
}

export async function loadCjPositions(dir = CJ_POSITIONS_DIR): Promise<CjPositionsSnapshot> {
  const [forMe, notForMe, notRecognized, js] = await Promise.all([
    readAllLines(cjPositionFilePath("forMe", dir)),
    readAllLines(cjPositionFilePath("notForMe", dir)),
    readAllLines(cjPositionFilePath("notRecognized", dir)),
    readAllLines(cjPositionFilePath("js", dir))
  ]);
  return { forMe, notForMe, notRecognized, js, dir };
}

/**
 * Move a position into ForMe.txt or NotForMe.txt and remove it from the
 * opposite bucket and NotRecognized.txt. Idempotent + dedup-ed.
 */
export async function moveCjPosition(
  log: ElectronLoggerNode,
  bucket: CjInterestBucket,
  position: string,
  dir = CJ_POSITIONS_DIR
): Promise<void> {
  const norm = normalizePosition(position);
  if (!norm) throw new Error("moveCjPosition: empty position");

  const targetFile = cjPositionFilePath(bucket, dir);
  const oppositeFile = cjPositionFilePath(bucket === "forMe" ? "notForMe" : "forMe", dir);
  const notRecognizedFile = cjPositionFilePath("notRecognized", dir);

  const [targetLines, oppositeLines, notRecLines] = await Promise.all([
    readAllLines(targetFile),
    readAllLines(oppositeFile),
    readAllLines(notRecognizedFile)
  ]);

  const matches = (l: string) => normalizePosition(l) === norm;
  const targetOut = dedupe([...targetLines.filter((l) => !matches(l)), norm]);
  const oppositeOut = dedupe(oppositeLines.filter((l) => !matches(l)));
  const notRecOut = dedupe(notRecLines.filter((l) => !matches(l)));

  await fs.mkdir(dir, { recursive: true });
  await Promise.all([
    writeAllLines(log, targetFile, targetOut),
    writeAllLines(log, oppositeFile, oppositeOut),
    writeAllLines(log, notRecognizedFile, notRecOut)
  ]);
}

function dedupe(lines: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const l of lines) {
    const t = l.trim();
    if (!t) continue;
    const key = normalizePosition(t);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out;
}
