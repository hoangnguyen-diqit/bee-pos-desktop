import React from "react";
import { useSelector } from "react-redux";

// import { createUDPServer, broadcastServer, createTCPServer } from "../../core/websocket/websocket-client";

type Props = {
    onServerDetected: (data, callback) => void,
    onSelectServerIP: (callback) => void,
    onNewOrder: (data) => void,
};

export function WebSocketListener() {

    const otServerIP = useSelector<any, any>(state => state.catalogReducer.otServerIP);

    React.useEffect(() => {
        if (!otServerIP) {
            // createUDPServer();
            // createTCPServer();
            // setTimeout(() => {
            //     broadcastServer({
            //         onTimeout: () => {
            //             console.log("Timeout");
            //             if (onSelectServerIP) {
            //                 onSelectServerIP(() => {

            //                 })
            //             }
            //         },
            //         onDetected: (data) => {
            //             onServerDetected(data, undefined);
            //         },
            //     });
            // }, 300);
        } else {
            // _handleWebSocket(serverIP);
        }
    }, []);

    return null;
}
