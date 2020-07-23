import React from "react";

import loadDbs from "../../core/nedb";
import { createSocket } from "../../core/websocket/websocket-client";

export function WebSocketListener() {

    const _handleWebSocket = () => {
        createSocket({
            onData: (data) => {
                console.log(data);
            }
        });
    }

    React.useEffect(() => {
        loadDbs();
        _handleWebSocket();
    }, []);

    return null;
}
