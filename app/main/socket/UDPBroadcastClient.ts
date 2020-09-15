import dgram from 'dgram';
import internalIp from 'internal-ip';
import defaultGateway  from "default-gateway";
import broadcastAddress from 'broadcast-address';

export const broadcastServer = function(data) {
    try {
        const ip = internalIp.v4.sync();
        console.log("Internal IP: " + ip);

        const defaultGatewayV4 = defaultGateway.v4.sync();
        console.log("Default gateway: " + defaultGatewayV4.gateway + " " + defaultGatewayV4.interface);

        const broadcaseAddressV4 = broadcastAddress(defaultGatewayV4.interface);
        console.log("Broadcast address: " + broadcaseAddressV4);

        const message = Buffer.from('Some bytes');

        var udpClient: dgram.Socket = dgram.createSocket("udp4");
        let timeoutTimer: any = undefined;

        // udpClient.bind(41233, function() { udpClient.setBroadcast(true); });
        udpClient.bind(function() {
            udpClient.setBroadcast(true);
        });

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
            udpClient.send(message, 0, message.length, 8887, broadcaseAddressV4, function(err, bytes) {
                console.log(err);
                console.log(bytes);
                // client.close();
            });

            createTimeoutTimer();
        }

        ping();

        // return close function
        return () => {
            if (udpClient) {
                udpClient.close();
            }
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
