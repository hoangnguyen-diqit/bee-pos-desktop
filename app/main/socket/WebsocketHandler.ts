import log from "electron-log";
import { server, connection, IMessage } from 'websocket';
import { ipcMain } from 'electron';

import { OrderRepo } from "../nedb/orderdb";

export class WebsocketHandler {

    _wsServer: server;
    _clients = {};

    _orderRepo;

    constructor(opts) {
        this._wsServer = opts.wsServer;

        console.log("Start listener");
        this._wsServer.on("request", (request) => {

            const connection: connection = request.accept(undefined, request.origin);
            connection.on('message', (data: IMessage) => {
                console.log(`Socket connect: hello from ${connection.remoteAddress}`);
                if (data.utf8Data) {
                    let parsedData: any = undefined;
                    try {
                        parsedData = JSON.parse(data.utf8Data);
                    } catch (err) {
                        log.error(err);
                    }

                    if (parsedData) {
                        this._handleMessage(connection, parsedData);
                    }
                } else if (data.binaryData) {
                    let parsedData: any = undefined;
                    try {
                        parsedData = JSON.parse(data.binaryData.toString());
                    } catch (err) {
                        log.error(err);
                    }

                    if (parsedData) {
                        this._handleMessage(connection, parsedData);
                    }
                }
            });

            connection.on('close', () => {
                console.log(`close: ${connection.remoteAddress}`);
                delete this._clients[connection.remoteAddress];
            });

            connection.on('error', () => {
                console.log(`error: ${connection.remoteAddress}`);
                delete this._clients[connection.remoteAddress];
            });

            console.log("Socket connected: " + connection.remoteAddress);
            this._clients[connection.remoteAddress] = connection;
        })

        this._startActions();
        this._createListener();
    }

    _startActions() {
        this._orderRepo = new OrderRepo();
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

    _handleAuth = () => {

    }

    _handleMessage = (connection: connection, parsedData) => {
        const type = parsedData.type || "";
        if (type === "hello") {
            connection.send(JSON.stringify({
                type: "helloClient",
                message: "What's up man?"
            }));
        } else if (type === "getOrders") {
            this._getOrders(connection, parsedData);
        }
    }

    _getOrders = async(connection: connection, data) => {
        try {
            const docs = await this._orderRepo.getOrders(data.filterMap);
            connection.send(JSON.stringify({
                type: "getOrdersResp",
                orders: docs,
            }))
        } catch (err) {
            connection.send(JSON.stringify({
                type: "getOrdersError",
            }))
        }
    }
}
