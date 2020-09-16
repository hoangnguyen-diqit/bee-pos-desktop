import React, { useEffect } from 'react';
import { ipcRenderer } from 'electron';

import { ipcEventMap } from './utils';

import { IPCClientContext } from "./IPCClientContext";

let ipcConnected = false;

export function IPCClient(props) {

    useEffect(() => {
        ipcConnected = true;
        ipcRenderer.on("message", (ev, args) => {
            _handleMessage(args);
        })

        return (() => {
            ipcRenderer.removeListener("message", (ev, args) => {});
        })
    })

    const _handleMessage = (message) => {
        if (ipcEventMap[message]) {
            ipcEventMap[message](message);
        }
    };

    return (
        <IPCClientContext.Provider value={{ ipcConnected }}>
            {React.Children.only(props.children)}
        </IPCClientContext.Provider>
    )
}
