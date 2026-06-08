import { join } from "path";
import { AppFolders } from "./enums/AppFolders";
import { ElectronLoggerNode } from "./types/ElectronLoggerNode";
import { createUpfoldersPsysicallyUnlessThere } from "./FS";

// import { AppFolders } from "../enums/AppFolders";
// import { app, ipcRenderer } from "electron";
// import log from "electron-log";
// import { createUpfoldersPsysicallyUnlessThere } from "../FS";

export function getFileTxt(appFolder: AppFolders, fnwoe: string) {
  return `D:/OneDrive/sunamo/ConsoleApp1/${appFolder}/${fnwoe}.txt`;
}

function getBaseFolder(userData: string) {
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

  return join(
    // to nejde. v produ je cesta s postfixem
    userData,
    "NotifyAboutLocalChanges",
    //userData,
    "appFolders"
  );
}

export function getFolder(type: AppFolders, userData: string) {
  return join(getBaseFolder(userData), type);
}

export function getFile(
  log: ElectronLoggerNode,
  type: AppFolders,
  fn: string,
  userData: string
) {
  const result = join(getFolder(type, userData), fn);
  void createUpfoldersPsysicallyUnlessThere(log, result);
  // if ( ) {
  //   return undefined;
  // }

  return result;
}
