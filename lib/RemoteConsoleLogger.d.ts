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
export interface RemoteConsoleOptions {
    endpoint?: string | null;
    logFile?: string | null;
    methods?: Array<"log" | "error" | "warn" | "info" | "debug">;
    includeTimestamp?: boolean;
    includeStackTrace?: boolean;
}
/**
 * EN: Setup remote console logging
 * CZ: Nastavit remote console logging
 */
export declare function setupRemoteConsole(options?: RemoteConsoleOptions): () => void;
/**
 * EN: Simple file logger for Electron main process
 * CZ: Jednoduchý file logger pro Electron main proces
 */
export declare function setupFileLogger(logFilePath: string): () => void;
