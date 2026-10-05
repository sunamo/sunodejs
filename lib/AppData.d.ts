import { AppFolders } from "./enums/AppFolders";
import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
export declare function isNotBackedUp(type: AppFolders): boolean;
export declare function getSunamoRoamingRoot(): string;
export declare function getSunamoLocalRoot(): string;
export declare function getAppRoot(appName: string, isLocal?: boolean): string;
export declare function getFolder(appName: string, type: AppFolders, isLocal?: boolean): string;
export declare function getFile(log: ElectronLoggerNode, appName: string, type: AppFolders, fileName: string, isLocal?: boolean): Promise<string>;
