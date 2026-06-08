import { ElectronLogger } from "../types/types";
export declare function fileExistsWithData(path: string): Promise<boolean>;
export declare function fileExists(path: string): Promise<boolean>;
export declare function checkDirectoryExists(log: ElectronLogger, path: string): Promise<boolean>;
export declare function createUpfoldersPsysicallyUnlessThere(log: ElectronLogger, path: string): Promise<boolean>;
export declare function createFoldersPsysicallyUnlessThere(log: ElectronLogger, path: string): Promise<boolean>;
export declare function withEndSlash(path: string): string;
