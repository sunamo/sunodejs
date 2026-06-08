"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDirectory = readDirectory;
exports.fileExistsWithData = fileExistsWithData;
exports.fileExists = fileExists;
exports.checkDirectoryExists = checkDirectoryExists;
exports.createUpfoldersPsysicallyUnlessThere = createUpfoldersPsysicallyUnlessThere;
exports.createFoldersPsysicallyUnlessThere = createFoldersPsysicallyUnlessThere;
exports.withEndSlash = withEndSlash;
const promises_1 = __importStar(require("node:fs/promises"));
//import { error } from "electron-log";
const path_1 = require("path");
async function readDirectory(directoryPath) {
    try {
        const files = await promises_1.default.readdir(directoryPath);
        console.log(`Soubory v adresáři ${directoryPath}:`);
        return files;
    }
    catch (err) {
        console.error(`Chyba při čtení adresáře ${directoryPath}:`, err);
    }
}
async function fileExistsWithData(path) {
    try {
        await promises_1.default.stat(path);
        return true; // Soubor existuje
    }
    catch (err) {
        return false; // Soubor neexistuje
    }
}
async function fileExists(path) {
    try {
        await promises_1.default.access(path);
        return true; // Soubor existuje
    }
    catch (err) {
        return false; // Soubor neexistuje
    }
}
async function checkDirectoryExists(log, path) {
    const { error } = log;
    try {
        const stats = await (0, promises_1.stat)(path);
        // Pokud stat proběhne úspěšně, zkontrolujeme, zda jde o adresář
        if (stats.isDirectory()) {
            return true;
        }
        else {
            return null;
        }
    }
    catch (err) {
        if (err.code === "ENOENT") {
            return false;
        }
        else {
            // Jiná chyba (např. nedostatečná oprávnění)
            error(`An error occurred while checking the path. "${path}":`, err);
            //throw err;
        }
    }
}
async function createUpfoldersPsysicallyUnlessThere(log, path) {
    const resolvedPath = (0, path_1.resolve)(path);
    return createFoldersPsysicallyUnlessThere(log, (0, path_1.dirname)(resolvedPath));
}
async function createFoldersPsysicallyUnlessThere(log, path) {
    const { error } = log;
    const resolvedPath = (0, path_1.resolve)(path);
    try {
        await promises_1.default.mkdir(resolvedPath, { recursive: true });
        return true;
    }
    catch (err) {
        error(`Error creating directory structure ${resolvedPath}:`, err);
        return false;
    }
}
function withEndSlash(path) {
    return path.endsWith("\\") ? path : path + "\\";
}
