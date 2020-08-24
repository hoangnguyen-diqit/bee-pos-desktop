import path from "path";
import fs from "fs";
import format from "string-template";
import { app, ipcMain, BrowserWindow } from "electron";

export function uiGetPrinters() {
    return BrowserWindow.getFocusedWindow()?.webContents.getPrinters();
}

export function uiPrintFile(data) {
    return true;
}

// 570px, 80mm
ipcMain.on("getPrinters", (event, args) => {
    event.sender.send("getPrintersResp", uiGetPrinters() || []);
});

ipcMain.on("printFile", (event, args) => {
    event.sender.send("printFileResp", uiPrintFile(args) || []);
});
