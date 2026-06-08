import { AppFolders } from "./enums/AppFolders";
import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
export declare function getFileTxt(appFolder: AppFolders, fnwoe: string): string;
export declare function getFolder(type: AppFolders, userData: string): string;
export declare function getFile(log: ElectronLoggerNode, type: AppFolders, fn: string, userData: string): string;
