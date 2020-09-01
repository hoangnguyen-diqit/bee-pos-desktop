import os from 'os';
import http from 'http';
import dgram from 'dgram';
import internalIp from 'internal-ip';
import { client, server as WebSocketServer  } from "websocket";
import { hasDeepValue } from 'has-deep-value';

var hasInterface = hasDeepValue;
var allInterfaces = os.networkInterfaces();
// console.log("CPUs: " + os.cpus().map(item => JSON.stringify(item)).join("\n"));
var addr_info;

var clientConnections = {};

function broadcastAddress(int = 'en0', address?: any) {
    if(!hasInterface(allInterfaces, int)) {
        throw new Error(`Unknown network interface (${int}).`);
    }

    // if an address is given, look it up under the given network interface
    // otherwise just get the first IPv4 occurence for that network interface
    if(address) {
        addr_info = allInterfaces[int].find((e: any) => e.address === address);
    } else {
        addr_info = allInterfaces[int].find((e: any) => e.family === 'IPv4');
    }

    if(!addr_info) {
        throw new Error(`No address info found. Specify a valid address.`);
    }

    var addr_splitted = addr_info.address.split('.');
    var netmask_splitted = addr_info.netmask.split('.');
    // bitwise OR over the splitted NAND netmask, then glue them back together with a dot character to form an ip
    // we have to do a NAND operation because of the 2-complements; getting rid of all the 'prepended' 1's with & 0xFF
    return addr_splitted.map((e: any, i: number) => (~netmask_splitted[i] & 0xFF) | e).join('.');
}

export const createUDPServer = function() {
    try {
        const message = Buffer.from('Some bytes');

        var server = dgram.createSocket("udp4");

        server.on("message", function (msg: string, rinfo: any) {
            console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
            server.send(message, rinfo.port, rinfo.address);
        });

        server.on("listening", function () {
            var address = server.address();
            console.log("server listening " + address.address + ":" + address.port);
        });

        server.bind(8887);
    } catch (error) {
        console.log(error);
    }
}

export const broadcastServer = function(data) {
    try {
        const ip = internalIp.v4.sync();
        console.log(ip);

        let broadcast1 =
        Object.keys(allInterfaces)
            .map(item => {
                const broadcast = broadcastAddress(item);
                console.log(broadcast);

                return broadcast;
            })
            .reduce((accu, curr) => {
                if (curr.startsWith("192.")) {
                    accu = curr;
                }

                return accu;
            }, "");

        console.log("Broadcast 1: " + broadcast1);

        const message = Buffer.from('Some bytes');

        var udpClient = dgram.createSocket("udp4");
        let timeoutTimer: any = undefined;

        // udpClient.bind(41233, function() { udpClient.setBroadcast(true); });
        udpClient.bind(function() { udpClient.setBroadcast(true); });

        udpClient.on("message", (msg: string, rinfo: any) => {
            clearTimeout(timeoutTimer);
            console.log("Client got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
            if (data && data.onDetected) {
                data.onDetected({
                    address: rinfo.address,
                    port: rinfo.port,
                });
            }
        })

        const createTimeoutTimer = () => {
            timeoutTimer = setTimeout(() => {
                if (data && data.onTimeout) {
                    data.onTimeout();
                }
            }, 3 * 1000)
        }

        const ping = () => {
            udpClient.send(message, 0, message.length, 8887, broadcast1, function(err, bytes) {
                console.log(err);
                console.log(bytes);
                // client.close();
            });

            createTimeoutTimer();
        }

        ping();
    } catch (error) {
        console.log(error);
    }
}

export const createTCPServer = function() {
    try {
        var server = http.createServer(function(request, response) {
            console.log((new Date()) + ' Received request for ' + request.url);
            response.writeHead(404);
            response.end();
        });
        server.listen(8887, function() {
            console.log((new Date()) + ' Server is listening on port 8887');
        });

        const wsServer = new WebSocketServer({
            httpServer: server,
            // You should not use autoAcceptConnections for production
            // applications, as it defeats all standard cross-origin protection
            // facilities built into the protocol and the browser.  You should
            // *always* verify the connection's origin and decide whether or not
            // to accept it.
            // autoAcceptConnections: false
        });

        function originIsAllowed(origin) {
            // put logic here to detect whether the specified origin is allowed.
            if (origin) {

            }
            return true;
        }

        wsServer.on('request', function(request) {
            console.log("Client came 0: " + request);

            if (!originIsAllowed(request.origin)) {
                // Make sure we only accept requests from an allowed origin
                request.reject();
                console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
                return;
            }

            // console.log("Request coming: " + JSON.stringify(request.protocol));
            var connection = request.accept(undefined, request.origin);
            console.log("Connection request: " + connection);
            console.log((new Date()) + ' Connection accepted.');
            connection.on('message', function(message: any) {
                if (message.type === 'utf8') {
                    console.log('Received Message: ' + JSON.stringify(message.utf8Data));
                    // connection.sendUTF(message.utf8Data);
                }
                else if (message.type === 'binary') {
                    console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
                    // connection.sendBytes(message.binaryData);
                }
            });
            connection.on('close', function() {
                console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
                if (clientConnections[connection.remoteAddress]) {
                    delete clientConnections[connection.remoteAddress];
                    console.log("Remove connection: " + connection.remoteAddress);
                }
            });

            console.log("Client came: " + connection.remoteAddress);
            clientConnections[connection.remoteAddress] = connection;
        });
    } catch (error) {
        console.log(error);
    }
}

export const sendToClient = function(clientId, data) {
    try {
        const clientConnection = clientConnections[clientId];
        if (clientConnection) {
            clientConnection.sendUTF(JSON.stringify(data));
        }
    } catch (error) {
        console.log(error);
    }
}

export const sendToAllClients = function(data) {
    try {
        // console.log("Send to client 1: " + JSON.stringify(clientConnections));
        if (Object.keys(clientConnections).length > 0) {
            console.log("Current clients: " + Object.keys(clientConnections).length + " " + Object.keys(clientConnections).join(", "));
            Object.keys(clientConnections)
                .forEach(key => {
                    const clientConnection = clientConnections[key];
                    if (clientConnection) {
                        clientConnection.sendUTF(JSON.stringify(data));
                    }
                })
        }
    } catch (error) {
        console.log(error);
    }
}

export const createSocket = function(data) {
    try {
        const socket = new client({
            webSocketVersion: 8,
        });
        // const socket = new WebSocket("ws://192.168.9.110:8887", {
        //     protocol: "HTTP/1.1",
        //     protocolVersion: 8,
        //     headers: {
        //         "GET": "/",
        //         "Connection": "Upgrade",
        //         "Host": "192.168.9.110:8887",
        //         // "Sec-WebSocket-Key": "ndxBq0mMopXPaXRzHkGNiw==",
        //         "Sec-WebSocket-Version": 8,
        //         "Upgrade": "websocket"
        //     },
        // });
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
            // connection.on('open', function(error) {
            //     console.log("Connection Open: " + error.toString());
            // });
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

            // function sendNumber() {
            //     if (connection.connected) {
            //         var number = Math.round(Math.random() * 0xFFFFFF);
            //         connection.sendUTF(number.toString());
            //         setTimeout(sendNumber, 1000);
            //     }
            // }
            // sendNumber();
            connection.sendUTF("Hello from Server");

            // 1111
            // 1110
            // 99991001 / 1001
        })

        socket.connect(`ws://${data.serverIP}:${data.serverPort || 8887}`);
    } catch (error) {
        console.log(error);
        if (data && data.onError) {
            data.onError(error);
        }
    }
}

// export default createSocket();
