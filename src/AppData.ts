import { join } from "path";
import os from "os";
import { AppFolders } from "./enums/AppFolders";
import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
import { createUpfoldersPsysicallyUnlessThere } from "./FS";

// TS/Electron obdoba SunamoPlatformUwpInterop (E:\vs\Projects\PlatformIndependentNuGetPackages\SunamoPlatformUwpInterop) — appky ukládají data výhradně pod _Sunamo\<appName>\..., žádné Cache/Temp.

export function getSunamoRoamingRoot(): string {
  return join(
    process.env.APPDATA ?? join(os.homedir(), "AppData", "Roaming"),
    "_Sunamo"
  );
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
  isLocal = false
): string {
  return join(getAppRoot(appName, isLocal), type);
}

export async function getFile(
  log: ElectronLoggerNode,
  appName: string,
  type: AppFolders,
  fileName: string,
  isLocal = false
): Promise<string> {
  const result = join(getFolder(appName, type, isLocal), fileName);
  await createUpfoldersPsysicallyUnlessThere(log, result);
  return result;
}
