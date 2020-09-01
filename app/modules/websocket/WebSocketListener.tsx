import React from "react";
import { useSelector } from "react-redux";

// import { createUDPServer, broadcastServer, createTCPServer } from "../../core/websocket/websocket-client";;

export function WebSocketListener() {

    const otServerIP = useSelector<any, any>(state => state.catalogReducer.otServerIP);

    React.useEffect(() => {
        if (!otServerIP) {

        } else {
            // _handleWebSocket(serverIP);
        }
    }, []);

    return null;
}
