"use strict";
/**
 * RemoteConsoleLogger.ts
 *
 * EN: Utility to capture and redirect console logs to a remote endpoint or file
 * CZ: Utilita pro zachytávání a přesměrování console logů na remote endpoint nebo do souboru
 *
 * Usage in your app:
 * import { setupRemoteConsole, setupFileLogger } from '@sunamo/sunode';
 * setupFileLogger('./logs/console.txt');
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRemoteConsole = setupRemoteConsole;
exports.setupFileLogger = setupFileLogger;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
/**
 * EN: Setup remote console logging
 * CZ: Nastavit remote console logging
 */
function setupRemoteConsole(options = {}) {
    const { endpoint = null, logFile = null, methods = ["log", "error", "warn", "info", "debug"], includeTimestamp = true, includeStackTrace = false, } = options;
    // EN: Store original console methods
    // CZ: Uložit původní console metody
    const originalConsole = {};
    methods.forEach((method) => {
        originalConsole[method] = console[method];
    });
    // EN: Override console methods
    // CZ: Přepsat console metody
    methods.forEach((method) => {
        console[method] = function (...args) {
            // EN: Call original method first
            // CZ: Nejdřív zavolat původní metodu
            originalConsole[method].apply(console, args);
            // EN: Prepare log entry
            // CZ: Připravit log záznam
            const logEntry = {
                level: method,
                message: args
                    .map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg)))
                    .join(" "),
                timestamp: includeTimestamp ? new Date().toISOString() : undefined,
                stack: includeStackTrace ? new Error().stack : undefined,
            };
            // EN: Send to remote endpoint
            // CZ: Poslat na remote endpoint
            if (endpoint && typeof fetch !== "undefined") {
                fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(logEntry),
                }).catch((err) => {
                    originalConsole.error("Failed to send log to remote:", err);
                });
            }
            // EN: Write to log file
            // CZ: Zapsat do log souboru
            if (logFile) {
                try {
                    const logDir = path_1.default.dirname(logFile);
                    if (!fs_1.default.existsSync(logDir)) {
                        fs_1.default.mkdirSync(logDir, { recursive: true });
                    }
                    const logLine = `[${logEntry.timestamp}] [${logEntry.level.toUpperCase()}] ${logEntry.message}\n`;
                    fs_1.default.appendFileSync(logFile, logLine, "utf8");
                }
                catch (err) {
                    originalConsole.error("Failed to write log to file:", err);
                }
            }
        };
    });
    // EN: Return cleanup function
    // CZ: Vrátit cleanup funkci
    return () => {
        methods.forEach((method) => {
            console[method] = originalConsole[method];
        });
    };
}
/**
 * EN: Simple file logger for Electron main process
 * CZ: Jednoduchý file logger pro Electron main proces
 */
function setupFileLogger(logFilePath) {
    return setupRemoteConsole({
        logFile: logFilePath,
        endpoint: null,
    });
}
