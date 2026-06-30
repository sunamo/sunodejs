"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommandInCmd = executeCommandInCmd;
exports.executeCommandInCmdInDirAsync = executeCommandInCmdInDirAsync;
exports.executeCommandInCmdAsync = executeCommandInCmdAsync;
const child_process_1 = require("child_process");
function executeCommandInCmd(props) {
    // EN: Safely destructure error from log, fallback to console.error if log is undefined
    // CZ: Bezpečně destructurovat error z log, fallback na console.error pokud log je undefined
    const error = props.log?.error || console.error;
    const { command } = props;
    let { args, options } = props;
    args ?? (args = []);
    options ?? (options = {});
    return new Promise((resolve, reject) => {
        // Default options for cross-platform compatibility
        const defaultOptions = {
            shell: true, // Important: Use shell for complex commands and paths
            windowsHide: true, // Hide the command window on Windows (optional)
        };
        const mergedOptions = { ...defaultOptions, ...options }; // Merge options
        const process = (0, child_process_1.spawn)(command, args, mergedOptions);
        let stdoutData = "";
        let stderrData = "";
        process.stdout.on("data", (data) => {
            stdoutData += data;
        });
        process.stderr.on("data", (data) => {
            stderrData += data;
            ////console.log(
            //   `tato chyba by se měla objevit i v logu: stderr: ${data} in folder ${props.options?.cwd}`
            // );
            error(`stderr: ${data} in folder ${props.options?.cwd}`); // Log errors to console
        });
        process.on("close", (code) => {
            if (code === 0) {
                resolve(stdoutData); // Resolve with stdout on success
            }
            else {
                // git status mě vracel pro adresáře kde není git code 128
                // ani nic do konzole to nevypsalo
                resolve("Something went wrong");
                //reject(new Error(`Command failed with code ${code}\n${stderrData}`)); // Reject with stderr and code on failure
            }
        });
        process.on("error", (err) => {
            reject(err);
        });
    });
}
function executeCommandInCmdInDirAsync(command, workingDir) {
    const options = {
        cwd: workingDir,
        windowsHide: true,
    };
    /*
  !!! NEMAZAT !!!
  
  zde se to chová úplně píčovsky
  error by měl být ExecException. Dokonce i AI to opakovaně tvrdí: https://g.co/gemini/share/75fa75fb9b7d
  
  Co se vrací z exec:
  error - strukturovaný objekt
  stderr - vše co příkaz vypsal na std. chybový výstup
  
  !!! NEMAZAT !!!
  */
    const result = new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
    return result;
}
async function executeCommandInCmdAsync({ command, }) {
    const result = new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, { windowsHide: true }, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
    // zde se ten console_.log for some reason nevypíše.
    //.log("result2", await result);
    return result;
}
