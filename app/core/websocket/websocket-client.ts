import os from 'os';
import dgram from 'dgram';
import internalIp from 'internal-ip';
import { client } from "websocket";
import { hasDeepValue } from 'has-deep-value';

var hasInterface = hasDeepValue;
var allInterfaces = os.networkInterfaces();
console.log(allInterfaces);
var addr_info;

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

        server.bind(41234);
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

        udpClient.bind(41233, function() { udpClient.setBroadcast(true); });

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
            }, 15 * 1000)
        }
        const ping = () => {

            // client.send(message, 0, message.length, 41234, "192.168.9.255");
            // client.send(message, 0, message.length, 41234, "localhost", function(err, bytes) {
            udpClient.send(message, 0, message.length, 8887, broadcast1, function(err, bytes) {
                console.log(err);
                console.log(bytes);
                // client.close();
            });

            createTimeoutTimer();
        }

        console.log(client);
        ping();
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
            connection.sendUTF("Hello Server");

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
