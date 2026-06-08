"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CJ_POSITION_FILES = exports.CJ_POSITIONS_DIR = void 0;
exports.normalizePosition = normalizePosition;
exports.cjPositionFilePath = cjPositionFilePath;
exports.loadCjPositions = loadCjPositions;
exports.moveCjPosition = moveCjPosition;
const path_1 = require("path");
const fs_1 = require("fs");
const TF_1 = require("./TF");
exports.CJ_POSITIONS_DIR = "D:\\OneDrive\\sunamo\\ConsoleApp1\\Data\\cj\\CjPositions";
exports.CJ_POSITION_FILES = {
    forMe: "ForMe.txt",
    notForMe: "NotForMe.txt",
    notRecognized: "NotRecognized.txt",
    js: "js.txt"
};
function normalizePosition(raw) {
    return String(raw || "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/1+$/, "")
        .trimEnd();
}
function cjPositionFilePath(bucket, dir = exports.CJ_POSITIONS_DIR) {
    return (0, path_1.join)(dir, exports.CJ_POSITION_FILES[bucket]);
}
async function loadCjPositions(dir = exports.CJ_POSITIONS_DIR) {
    const [forMe, notForMe, notRecognized, js] = await Promise.all([
        (0, TF_1.readAllLines)(cjPositionFilePath("forMe", dir)),
        (0, TF_1.readAllLines)(cjPositionFilePath("notForMe", dir)),
        (0, TF_1.readAllLines)(cjPositionFilePath("notRecognized", dir)),
        (0, TF_1.readAllLines)(cjPositionFilePath("js", dir))
    ]);
    return { forMe, notForMe, notRecognized, js, dir };
}
/**
 * Move a position into ForMe.txt or NotForMe.txt and remove it from the
 * opposite bucket and NotRecognized.txt. Idempotent + dedup-ed.
 */
async function moveCjPosition(log, bucket, position, dir = exports.CJ_POSITIONS_DIR) {
    const norm = normalizePosition(position);
    if (!norm)
        throw new Error("moveCjPosition: empty position");
    const targetFile = cjPositionFilePath(bucket, dir);
    const oppositeFile = cjPositionFilePath(bucket === "forMe" ? "notForMe" : "forMe", dir);
    const notRecognizedFile = cjPositionFilePath("notRecognized", dir);
    const [targetLines, oppositeLines, notRecLines] = await Promise.all([
        (0, TF_1.readAllLines)(targetFile),
        (0, TF_1.readAllLines)(oppositeFile),
        (0, TF_1.readAllLines)(notRecognizedFile)
    ]);
    const matches = (l) => normalizePosition(l) === norm;
    const targetOut = dedupe([...targetLines.filter((l) => !matches(l)), norm]);
    const oppositeOut = dedupe(oppositeLines.filter((l) => !matches(l)));
    const notRecOut = dedupe(notRecLines.filter((l) => !matches(l)));
    await fs_1.promises.mkdir(dir, { recursive: true });
    await Promise.all([
        (0, TF_1.writeAllLines)(log, targetFile, targetOut),
        (0, TF_1.writeAllLines)(log, oppositeFile, oppositeOut),
        (0, TF_1.writeAllLines)(log, notRecognizedFile, notRecOut)
    ]);
}
function dedupe(lines) {
    const seen = new Set();
    const out = [];
    for (const l of lines) {
        const t = l.trim();
        if (!t)
            continue;
        const key = normalizePosition(t);
        if (seen.has(key))
            continue;
        seen.add(key);
        out.push(t);
    }
    return out;
}
