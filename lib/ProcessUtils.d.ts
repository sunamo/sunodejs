import { ExecException, SpawnOptionsWithoutStdio } from "child_process";
import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
export type executeCommandInCmdProps = {
    command: string;
    args?: string[];
    options?: SpawnOptionsWithoutStdio;
    log: ElectronLoggerNode;
};
export declare function executeCommandInCmd(props: executeCommandInCmdProps): Promise<string>;
export declare function executeCommandInCmdInDirAsync(command: string, workingDir: string): Promise<string | ExecException | null>;
export type executeCommandInCmdAsyncProps = {
    command: string;
};
export declare function executeCommandInCmdAsync({ command, }: executeCommandInCmdAsyncProps): Promise<string>;
