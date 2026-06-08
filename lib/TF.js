"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeAllLines = writeAllLines;
exports.readAllLines = readAllLines;
const promises_1 = __importDefault(require("fs/promises"));
async function writeAllLines(log, filePath, lines) {
    const { error } = log;
    try {
        await promises_1.default.writeFile(filePath, lines.join("\n"), "utf8");
    }
    catch (err) {
        error(`Error writing to file: ${filePath}`, err);
    }
}
async function readAllLines(filePath) {
    try {
        const raw = await promises_1.default.readFile(filePath, "utf8");
        return raw
            .replace(/^﻿/, "")
            .split(/\r?\n/)
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
    }
    catch (err) {
        if (err && err.code === "ENOENT")
            return [];
        throw err;
    }
}
