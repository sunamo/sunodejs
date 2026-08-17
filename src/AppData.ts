import { join } from "path";
import os from "os";
import fs from "fs";
import { AppFolders } from "./enums/AppFolders";
import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
import { createUpfoldersPsysicallyUnlessThere } from "./FS";

// TS/Electron obdoba SunamoPlatformUwpInterop (E:\vs\Projects\PlatformIndependentNuGetPackages\SunamoPlatformUwpInterop) — appky ukládají data výhradně pod _Sunamo\<appName>\..., žádné Cache/Temp.

const ROAMING_ROOT_FILE = "roamingSunamoRoot.txt";

// Logs/Output/Reports/Backup = Local (nebackupovane), zbytek = Roaming/backupovane — stejne jako .NET AppFoldersHelper.IsNotBackuped.
const NOT_BACKED_UP: AppFolders[] = ["Logs", "Output", "Reports", "Backup"];

export function isNotBackedUp(type: AppFolders): boolean {
  return NOT_BACKED_UP.includes(type);
}

function defaultRoamingRoot(): string {
  return join(
    process.env.APPDATA ?? join(os.homedir(), "AppData", "Roaming"),
    "_Sunamo"
  );
}

// Cte %AppData%\Roaming\_Sunamo\roamingSunamoRoot.txt — obsah je kořenová cesta, pod kterou appky
// ukládají Roaming data (default D:\OneDrive\sunamo). Prázdný/chybějící soubor → fallback do _Sunamo.
export function getSunamoRoamingRoot(): string {
  const pointerPath = join(defaultRoamingRoot(), ROAMING_ROOT_FILE);
  try {
    const content = fs.readFileSync(pointerPath, "utf-8").trim();
    if (content) return content;
  } catch {
    // soubor neexistuje nebo se nedá číst — fallback níže
  }
  return defaultRoamingRoot();
}

export function getSunamoLocalRoot(): string {
  return join(
    process.env.LOCALAPPDATA ?? join(os.homedir(), "AppData", "Local"),
    "_Sunamo"
  );
}

export function getAppRoot(appName: string, isLocal = false): string {
  return join(isLocal ? getSunamoLocalRoot() : getSunamoRoamingRoot(), appName);
}

export function getFolder(
  appName: string,
  type: AppFolders,
  isLocal?: boolean
): string {
  return join(getAppRoot(appName, isLocal ?? isNotBackedUp(type)), type);
}

export async function getFile(
  log: ElectronLoggerNode,
  appName: string,
  type: AppFolders,
  fileName: string,
  isLocal?: boolean
): Promise<string> {
  const result = join(getFolder(appName, type, isLocal), fileName);
  await createUpfoldersPsysicallyUnlessThere(log, result);
  return result;
}
