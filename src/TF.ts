import fs from "fs/promises";
import { ElectronLoggerNode } from "./types/ElectronLoggerNode";

export async function writeAllLines(
  log: ElectronLoggerNode,
  filePath: string,
  lines: string[]
) {
  const { error } = log;
  try {
    await fs.writeFile(filePath, lines.join("\n"), "utf8");
  } catch (err) {
    error(`Error writing to file: ${filePath}`, err);
  }
}

export async function readAllLines(filePath: string): Promise<string[]> {
  try {
    const raw = await fs.readFile(filePath, "utf8");
    return raw
      .replace(/^﻿/, "")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
  } catch (err: any) {
    if (err && err.code === "ENOENT") return [];
    throw err;
  }
}
