import { ipcMain } from "electron";
import { createUDPServer, createTCPServer, sendToAllClients } from "./websocket-client";

ipcMain.on("sendToClient", (ev, args) => {
    sendToAllClients(args)

    ev.sender.send("sendToClientResp", {
        message: "completed",
    })
})

export {
    createUDPServer,
    createTCPServer,
}
