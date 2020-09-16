import React, { useContext, useEffect } from 'react';
import { w3cwebsocket, IMessageEvent } from 'websocket';

import { WsContext } from './WsContext';
import { AppContext } from '../../AppContext';
import { wsEventMap } from './utils';
// import WsEvent from './WsEvent';

let socket: w3cwebsocket;

type Props = {
    options?: any,
    children: React.ReactNode,
};

function WsClient(props: Props) {

    const {
        serverAddress,
        updateServerAddress,
    } = useContext(AppContext);

    useEffect(() => {
        if (serverAddress) {
            socket = new w3cwebsocket(`ws://${serverAddress}:8887`);

            socket.onerror = function() {
                console.log('Connection Error');
                updateServerAddress("");
            };

            socket.onopen = function() {
                console.log('WebSocket Client Connected');

                function sendNumber() {
                    if (socket.readyState === socket.OPEN) {
                        var number = Math.round(Math.random() * 0xFFFFFF);
                        socket.send(JSON.stringify({
                            type: "hello",
                            number: number.toString()
                        }));
                        setTimeout(sendNumber, 1000);
                    }
                }
                sendNumber();
            };

            socket.onclose = function() {
                console.log('echo-protocol Client Closed');
                updateServerAddress("");
            };

            socket.onmessage = function(e: IMessageEvent) {
                let parsedData;
                if (typeof e.data === 'string') {
                    console.log("Received: '" + e.data + "'");
                    try {
                        parsedData = JSON.parse(e.data);
                    } catch (err) {
                    }
                } else if (e.data instanceof Buffer) {
                    console.log("Received: '" + e.data.toString() + "'");
                } else if (e.data instanceof ArrayBuffer) {
                    console.log("Received: '" + e.data.toString() + "'");
                }

                if (parsedData && parsedData.type) {
                    console.log("Received: '" + JSON.stringify(wsEventMap) + "'");
                    if (wsEventMap[parsedData.type]) {
                        wsEventMap[parsedData.type](parsedData);
                    }
                }
            };
        }

        return (() => {
            if (socket) {
                socket.close();
            }
        })
    }, [ serverAddress ]);

    return (
        <WsContext.Provider value={{ socket }}>
            {React.Children.only(props.children)}
            {/* <WsEvent
                event="message"
                handler={(message) => console.log("React Socket " + message)}
            /> */}
        </WsContext.Provider>
    );
}

export default WsClient;
