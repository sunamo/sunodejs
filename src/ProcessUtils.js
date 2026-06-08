"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.executeCommandInCmdAsync = exports.executeCommandInCmdInDirAsync = exports.executeCommandInCmd = void 0;
var child_process_1 = require("child_process");
function executeCommandInCmd(props) {
    var error = props.log.error;
    var command = props.command;
    var args = props.args, options = props.options;
    args !== null && args !== void 0 ? args : (args = []);
    options !== null && options !== void 0 ? options : (options = {});
    return new Promise(function (resolve, reject) {
        // Default options for cross-platform compatibility
        var defaultOptions = {
            shell: true,
            windowsHide: true
        };
        var mergedOptions = __assign(__assign({}, defaultOptions), options); // Merge options
        var process = (0, child_process_1.spawn)(command, args, mergedOptions);
        var stdoutData = "";
        var stderrData = "";
        process.stdout.on("data", function (data) {
            stdoutData += data;
        });
        process.stderr.on("data", function (data) {
            var _a;
            stderrData += data;
            ////console.log(
            //   `tato chyba by se měla objevit i v logu: stderr: ${data} in folder ${props.options?.cwd}`
            // );
            error("stderr: ".concat(data, " in folder ").concat((_a = props.options) === null || _a === void 0 ? void 0 : _a.cwd)); // Log errors to console
        });
        process.on("close", function (code) {
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
        process.on("error", function (err) {
            reject(err);
        });
    });
}
exports.executeCommandInCmd = executeCommandInCmd;
function executeCommandInCmdInDirAsync(command, workingDir) {
    var options = {
        cwd: workingDir
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
    var result = new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(command, options, function (error, stdout, stderr) {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
    return result;
}
exports.executeCommandInCmdInDirAsync = executeCommandInCmdInDirAsync;
function executeCommandInCmdAsync(_a) {
    var command = _a.command;
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_b) {
            result = new Promise(function (resolve, reject) {
                (0, child_process_1.exec)(command, function (error, stdout, stderr) {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve(stdout);
                });
            });
            // zde se ten console_.log for some reason nevypíše.
            //.log("result2", await result);
            return [2 /*return*/, result];
        });
    });
}
exports.executeCommandInCmdAsync = executeCommandInCmdAsync;
