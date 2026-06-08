import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
export declare function readDirectory(directoryPath: string): Promise<string[] | undefined>;
export declare function fileExistsWithData(path: string): Promise<boolean>;
export declare function fileExists(path: string): Promise<boolean>;
export declare function checkDirectoryExists(log: ElectronLoggerNode, path: string): Promise<boolean | null | undefined>;
export declare function createUpfoldersPsysicallyUnlessThere(log: ElectronLoggerNode, path: string): Promise<boolean>;
export declare function createFoldersPsysicallyUnlessThere(log: ElectronLoggerNode, path: string): Promise<boolean>;
export declare function withEndSlash(path: string): string;
