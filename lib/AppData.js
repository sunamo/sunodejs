"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotBackedUp = isNotBackedUp;
exports.getSunamoRoamingRoot = getSunamoRoamingRoot;
exports.getSunamoLocalRoot = getSunamoLocalRoot;
exports.getAppRoot = getAppRoot;
exports.getFolder = getFolder;
exports.getFile = getFile;
const path_1 = require("path");
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const FS_1 = require("./FS");
// TS/Electron obdoba SunamoPlatformUwpInterop (E:\vs\Projects\PlatformIndependentNuGetPackages\SunamoPlatformUwpInterop) — appky ukládají data výhradně pod _Sunamo\<appName>\..., žádné Cache/Temp.
const ROAMING_ROOT_FILE = "roamingSunamoRoot.txt";
// Logs/Output/Reports/Backup = Local (nebackupovane), zbytek = Roaming/backupovane — stejne jako .NET AppFoldersHelper.IsNotBackuped.
const NOT_BACKED_UP = ["Logs", "Output", "Reports", "Backup"];
function isNotBackedUp(type) {
    return NOT_BACKED_UP.includes(type);
}
function defaultRoamingRoot() {
    return (0, path_1.join)(process.env.APPDATA ?? (0, path_1.join)(os_1.default.homedir(), "AppData", "Roaming"), "_Sunamo");
}
// Cte %AppData%\Roaming\_Sunamo\roamingSunamoRoot.txt — obsah je kořenová cesta, pod kterou appky
// ukládají Roaming data (default D:\OneDrive\sunamo). Prázdný/chybějící soubor → fallback do _Sunamo.
function getSunamoRoamingRoot() {
    const pointerPath = (0, path_1.join)(defaultRoamingRoot(), ROAMING_ROOT_FILE);
    try {
        const content = fs_1.default.readFileSync(pointerPath, "utf-8").trim();
        if (content)
            return content;
    }
    catch {
        // soubor neexistuje nebo se nedá číst — fallback níže
    }
    return defaultRoamingRoot();
}
function getSunamoLocalRoot() {
    return (0, path_1.join)(process.env.LOCALAPPDATA ?? (0, path_1.join)(os_1.default.homedir(), "AppData", "Local"), "_Sunamo");
}
function getAppRoot(appName, isLocal = false) {
    return (0, path_1.join)(isLocal ? getSunamoLocalRoot() : getSunamoRoamingRoot(), appName);
}
function getFolder(appName, type, isLocal) {
    return (0, path_1.join)(getAppRoot(appName, isLocal ?? isNotBackedUp(type)), type);
}
async function getFile(log, appName, type, fileName, isLocal) {
    const result = (0, path_1.join)(getFolder(appName, type, isLocal), fileName);
    await (0, FS_1.createUpfoldersPsysicallyUnlessThere)(log, result);
    return result;
}
