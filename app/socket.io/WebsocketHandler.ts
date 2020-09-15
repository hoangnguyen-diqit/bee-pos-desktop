import log from "electron-log";
import { server, connection, IMessage } from 'websocket';
import { ipcMain } from 'electron';

export class WebsocketHandler {

    _wsServer: server;
    _clients: any[] = [];

    constructor(opts) {
        this._wsServer = opts.wsServer;

        console.log("Start listener");
        this._wsServer.on("request", (request) => {

            const connection: connection = request.accept(undefined, request.origin);
            connection.on('message', (data: IMessage) => {
                console.log(`hello from ${connection.remoteAddress}`);
                if (data.utf8Data) {
                    let parsedData: any = undefined;
                    try {
                        parsedData = JSON.parse(data.utf8Data);
                    } catch (err) {
                        log.error(err);
                    }

                    if (parsedData) {
                        this._handleMessage(parsedData.type, parsedData.data);
                    }
                }
            });

            connection.on('close', () => {
                console.log(`close: ${connection.remoteAddress}`);
            });

            connection.on('error', () => {
                console.log(`error: ${connection.remoteAddress}`);
            });

            console.log("Socket connected: " + connection.remoteAddress);
            this._clients[connection.remoteAddress] = connection;
        })

        this._createListener();
    }

    _createListener() {
        ipcMain.on("sendToClient", (ev, args) => {
            this._sendToAllClients(args)

            ev.sender.send("sendToClientResp", {
                message: "completed",
            })
        })

        ipcMain.on("sendToOneClient", (ev, args) => {
            this._sendToClient(args.clientId, args);

            ev.sender.send("sendToOneClientResp", {
                message: "completed",
            })
        })
    }

    _sendToClient = (clientId, data) => {
        try {
            const clientConnection = this._clients[clientId];
            if (clientConnection) {
                clientConnection.sendUTF(JSON.stringify(data));
            }
        } catch (error) {
            console.log(error);
        }
    }

    _sendToAllClients = (data) => {
        try {
            // console.log("Send to client 1: " + JSON.stringify(clientConnections));
            if (Object.keys(this._clients).length > 0) {
                console.log("Current clients: " + Object.keys(this._clients).length + " " + Object.keys(this._clients).join(", "));
                Object.keys(this._clients)
                    .forEach(key => {
                        const clientConnection = this._clients[key];
                        if (clientConnection) {
                            clientConnection.sendUTF(JSON.stringify(data));
                        }
                    })
            }
        } catch (error) {
            console.log(error);
        }
    }

    _handleMessage = (type, data) => {
        if (type === "") {

        }
    }
}
