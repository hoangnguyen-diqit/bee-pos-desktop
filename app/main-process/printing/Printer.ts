import { ipcMain } from "electron";
import { getPrinters } from "@thiagoelg/node-printer";

export function listPrinters() {
    return getPrinters();
}

ipcMain.on("listPrinters", (event, args) => {
    event.sender.send("listPrintersRes", listPrinters() || []);
});
