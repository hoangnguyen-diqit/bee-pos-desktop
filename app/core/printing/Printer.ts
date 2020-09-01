import { ipcMain, BrowserWindow } from "electron";

export function uiGetPrinters() {
    return BrowserWindow.getFocusedWindow()?.webContents.getPrinters();
}

// 570px, 80mm
ipcMain.on("getPrinters", (event) => {
    event.sender.send("getPrintersResp", uiGetPrinters() || []);
});
