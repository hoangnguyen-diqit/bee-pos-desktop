import { ipcMain } from "electron";
import { createUDPServer, createTCPServer } from "./websocket-client";

// ipcMain.on("sendToClient", (ev, args) => {
//     sendToAllClients(args)

//     ev.sender.send("sendToClientResp", {
//         message: "completed",
//     })
// })

ipcMain.on("startServer", (ev, args) => {
    // createTCPServer({
    //     onData: (data) => {
    //         ev.sender.send("serverSocketData", data)
    //     }
    // });
})

export {
    createUDPServer,
    createTCPServer,
}
