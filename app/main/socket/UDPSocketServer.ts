import dgram from 'dgram';

export const createUDPServer = function() {
    try {
        const message = Buffer.from('Some bytes');
        var server: dgram.Socket = dgram.createSocket("udp4");

        server.on("message", function (msg: string, rinfo: any) {
            console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
            server.send(message, rinfo.port, rinfo.address);
        });

        server.on("listening", function () {
            var address = server.address();
            console.log("server listening " + address.address + ":" + address.port);
        });

        server.bind(8887);

        // return close method
        return () => {
            if (server) {
                server.close();
            }
        }
    } catch (error) {
        console.log(error);
        return undefined;
    }
}
