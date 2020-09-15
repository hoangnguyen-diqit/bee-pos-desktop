import React, { useContext, useEffect } from 'react';
import { w3cwebsocket } from 'websocket';

import { WsContext } from './WsContext';
import { AppContext } from '../../AppContext';
import WsEvent from './WsEvent';

let socket: w3cwebsocket;

type Props = {
    options?: any,
    children: React.ReactNode,
};

function WsClient(props: Props) {

    const {
        serverAddress,
    } = useContext(AppContext);

    useEffect(() => {
        if (serverAddress) {
            socket = new w3cwebsocket(`ws://${serverAddress}:8887`);

            socket.onerror = function() {
                console.log('Connection Error');
            };

            socket.onopen = function() {
                console.log('WebSocket Client Connected');

                function sendNumber() {
                    if (socket.readyState === socket.OPEN) {
                        var number = Math.round(Math.random() * 0xFFFFFF);
                        socket.send(number.toString());
                        setTimeout(sendNumber, 1000);
                    }
                }
                sendNumber();
            };

            socket.onclose = function() {
                console.log('echo-protocol Client Closed');
            };

            socket.onmessage = function(e) {
                if (typeof e.data === 'string') {
                    console.log("Received: '" + e.data + "'");
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
            <WsEvent
                event="message"
                handler={(message) => console.log("React Socket " + message)}
            />
        </WsContext.Provider>
    );
}

export default WsClient;
