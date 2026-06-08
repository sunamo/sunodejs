"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileTxt = getFileTxt;
exports.getFolder = getFolder;
exports.getFile = getFile;
const path_1 = require("path");
const FS_1 = require("./FS");
// import { AppFolders } from "../enums/AppFolders";
// import { app, ipcRenderer } from "electron";
// import log from "electron-log";
// import { createUpfoldersPsysicallyUnlessThere } from "../FS";
function getFileTxt(appFolder, fnwoe) {
    return `D:/OneDrive/sunamo/ConsoleApp1/${appFolder}/${fnwoe}.txt`;
}
function getBaseFolder(userData) {
    //ipcRenderer.getPath("userData")
    // zde už toto do logu nic nezapíše, protože už nejsem ve renderer procesu!
    // tím že jsem zavolal window.electronAPI.getFile jsem z rendeder procesu odešel
    // window už zde není k dispozici
    //
    //
    //window.logAPI.error("getBaseFolder");
    /*
    Cannot read properties of undefined (reading 'getPath')
    tuhle chybu si tu už nechám, už je to podruhé co řeším tu samou!
    */
    //const userData = ipcRenderer.sendSync("get-app-path");
    // takhle to taky nejde, app je k dispozici po
    //const userData = app.getPath("userData"); // tady nemůžu používat console.log, jsem mimo main proces
    //const userData = ipcRenderer.sendSync("getPath", "appData");
    return (0, path_1.join)(
    // to nejde. v produ je cesta s postfixem
    userData, "NotifyAboutLocalChanges", 
    //userData,
    "appFolders");
}
function getFolder(type, userData) {
    return (0, path_1.join)(getBaseFolder(userData), type);
}
function getFile(log, type, fn, userData) {
    const result = (0, path_1.join)(getFolder(type, userData), fn);
    void (0, FS_1.createUpfoldersPsysicallyUnlessThere)(log, result);
    // if ( ) {
    //   return undefined;
    // }
    return result;
}
