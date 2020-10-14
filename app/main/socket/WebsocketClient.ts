import { client } from "websocket";

export const createSocket = function(data) {
    try {
        const socket = new client({
            webSocketVersion: 8,
        });
        socket.on('connectFailed', function(error) {
            console.log('Connect Error: ' + error.toString());
            if (data && data.onError) {
                data.onError(error);
            }
        });

        socket.on('connect', function(connection) {
            console.log('WebSocket Client Connected');
            if (data && data.onConnected) {
                data.onConnected();
            }
            connection.on('error', function(error) {
                console.log("Connection Error: " + error.toString());
                if (data && data.onDataError) {
                    data.onDataError(error);
                }
            });
            connection.on('close', function() {
                console.log('echo-protocol Connection Closed');
            });
            connection.on('message', function(message) {
                if (message.type === 'utf8') {
                    console.log("Received: '" + message.utf8Data + "'");
                    const formattedUtf8Data = JSON.parse(message.utf8Data || "");
                    if (data && data.onData) {
                        data.onData(formattedUtf8Data);
                    }
                    switch (formattedUtf8Data.actionType) {
                        case "order_insert":
                            // ipcRenderer.send("newOrder", { data: formattedUtf8Data.data });
                            break;
                    }
                }
            });

            connection.sendUTF("Hello from Server");
        })

        socket.connect(`ws://${data.serverIP}:${data.serverPort || 8887}`);
    } catch (error) {
        console.log(error);
        if (data && data.onError) {
            data.onError(error);
        }
    }
}
