import React from "react";
import { useSelector } from "react-redux";

import loadDbs from "../../core/nedb";
import { createUDPServer, broadcastServer } from "../../core/websocket/websocket-client";

type Props = {
    onServerDetected: (data, callback) => void,
    onSelectServerIP: (callback) => void,
    onNewOrder: (data) => void,
};

export function WebSocketListener({
    onServerDetected,
    onSelectServerIP,
}: Props) {

    const otServerIP = useSelector<any, any>(state => state.catalogReducer.otServerIP);

    React.useEffect(() => {
        loadDbs();

        if (!otServerIP) {
            // createUDPServer();
            setTimeout(() => {
                broadcastServer({
                    onTimeout: () => {
                        console.log("Timeout");
                        if (onSelectServerIP) {
                            onSelectServerIP(() => {

                            })
                        }
                    },
                    onDetected: (data) => {
                        onServerDetected(data, undefined);
                    },
                });
            }, 300);
        } else {
            // _handleWebSocket(serverIP);
        }
    }, []);

    return null;
}
