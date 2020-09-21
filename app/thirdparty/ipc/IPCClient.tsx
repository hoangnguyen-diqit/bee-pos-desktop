import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { IPCClientContext } from "./IPCClientContext";

const ipcEventMap = {};
let ipcConnected = false;

export function IPCClient(props) {

    useEffect(() => {
        ipcConnected = true;
        ipcRenderer.on("message", (ev, args) => {
            _handleMessage(args);
        })

        function sendNumber() {
            var number = Math.round(Math.random() * 0xFFFFFF);
            ipcRenderer.send("message", {
                type: "hello",
                number: number.toString(),
            })
            setTimeout(sendNumber, 1000);
        }
        sendNumber();

        return (() => {
            ipcRenderer.removeListener("message", (ev, args) => {});
        })
    })

    const _handleMessage = (message) => {
        if (message.type && ipcEventMap[message.type]) {
            ipcEventMap[message.type](message);
        }
    };

    return (
        <IPCClientContext.Provider value={{
            ipcConnected,
            ipcEventMap,
        }}>
            {/* {React.Children.only(props.children)} */}
            {props.children}
        </IPCClientContext.Provider>
    )
}
