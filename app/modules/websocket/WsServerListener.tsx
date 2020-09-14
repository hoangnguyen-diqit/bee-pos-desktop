import React from "react";
import { ipcRenderer } from "electron";

export function WsServerListener() {

    const _handleServerData = (data) => {
        if (data.actionType) {
            if (data.actionType === "driver_get") {
                ipcRenderer.send("sendToClient", {

                })
            }
        }
    }

    React.useEffect(() => {
        ipcRenderer.on("serverSocketData", (ev, args) => {
            _handleServerData(args);
        })

        ipcRenderer.send("startServer", {

        });
    }, []);

    return null;
}
