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

import fs from "fs";
import path from "path";

export interface RemoteConsoleOptions {
  endpoint?: string | null;
  logFile?: string | null;
  methods?: Array<"log" | "error" | "warn" | "info" | "debug">;
  includeTimestamp?: boolean;
  includeStackTrace?: boolean;
}

interface LogEntry {
  level: string;
  message: string;
  timestamp?: string;
  stack?: string;
}

/**
 * EN: Setup remote console logging
 * CZ: Nastavit remote console logging
 */
export function setupRemoteConsole(options: RemoteConsoleOptions = {}): () => void {
  const {
    endpoint = null,
    logFile = null,
    methods = ["log", "error", "warn", "info", "debug"],
    includeTimestamp = true,
    includeStackTrace = false,
  } = options;

  // EN: Store original console methods
  // CZ: Uložit původní console metody
  const originalConsole: Record<string, (...args: any[]) => void> = {};
  methods.forEach((method) => {
    originalConsole[method] = console[method as keyof Console] as (...args: any[]) => void;
  });

  // EN: Override console methods
  // CZ: Přepsat console metody
  methods.forEach((method) => {
    (console as any)[method] = function (...args: any[]) {
      // EN: Call original method first
      // CZ: Nejdřív zavolat původní metodu
      originalConsole[method].apply(console, args);

      // EN: Prepare log entry
      // CZ: Připravit log záznam
      const logEntry: LogEntry = {
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
          const logDir = path.dirname(logFile);
          if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
          }

          const logLine = `[${logEntry.timestamp}] [${logEntry.level.toUpperCase()}] ${logEntry.message}\n`;
          fs.appendFileSync(logFile, logLine, "utf8");
        } catch (err) {
          originalConsole.error("Failed to write log to file:", err);
        }
      }
    };
  });

  // EN: Return cleanup function
  // CZ: Vrátit cleanup funkci
  return () => {
    methods.forEach((method) => {
      (console as any)[method] = originalConsole[method];
    });
  };
}

/**
 * EN: Simple file logger for Electron main process
 * CZ: Jednoduchý file logger pro Electron main proces
 */
export function setupFileLogger(logFilePath: string): () => void {
  return setupRemoteConsole({
    logFile: logFilePath,
    endpoint: null,
  });
}
