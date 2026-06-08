import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
export declare function writeAllLines(log: ElectronLoggerNode, filePath: string, lines: string[]): Promise<void>;
export declare function readAllLines(filePath: string): Promise<string[]>;
