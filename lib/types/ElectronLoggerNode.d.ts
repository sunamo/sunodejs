export type ElectronLoggerNode = {
    info: (...params: any[]) => void;
    warn: (...params: any[]) => void;
    error: (...params: any[]) => void;
    debug: (...params: any[]) => void;
};
