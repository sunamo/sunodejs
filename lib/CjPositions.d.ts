import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
export declare const CJ_POSITIONS_DIR = "D:\\OneDrive\\sunamo\\ConsoleApp1\\Data\\cj\\CjPositions";
export declare const CJ_POSITION_FILES: {
    readonly forMe: "ForMe.txt";
    readonly notForMe: "NotForMe.txt";
    readonly notRecognized: "NotRecognized.txt";
    readonly js: "js.txt";
};
export type CjPositionBucket = keyof typeof CJ_POSITION_FILES;
export type CjInterestBucket = "forMe" | "notForMe";
export interface CjPositionsSnapshot {
    forMe: string[];
    notForMe: string[];
    notRecognized: string[];
    js: string[];
    dir: string;
}
export declare function normalizePosition(raw: string): string;
export declare function cjPositionFilePath(bucket: CjPositionBucket, dir?: string): string;
export declare function loadCjPositions(dir?: string): Promise<CjPositionsSnapshot>;
/**
 * Move a position into ForMe.txt or NotForMe.txt and remove it from the
 * opposite bucket and NotRecognized.txt. Idempotent + dedup-ed.
 */
export declare function moveCjPosition(log: ElectronLoggerNode, bucket: CjInterestBucket, position: string, dir?: string): Promise<void>;
