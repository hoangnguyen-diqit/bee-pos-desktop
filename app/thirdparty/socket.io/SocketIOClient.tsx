import React, { useContext } from 'react';
// import SocketIO from 'socket.io-client';

import { SocketContext } from './SocketContext';
// import { warning, debug } from './utils';
import { AppContext } from '../../AppContext';
import SocketIOEvent from './SocketIOEvent';

// function mergeOptions(options = {}) {
//     const defaultOptions = {
//         reconnection: true,
//         reconnectionAttempts: Infinity,
//         reconnectionDelay: 1 * 1000,
//         reconnectionDelayMax: 10 * 1000,
//         autoConnect: true,
//         transports: ['polling'],
//         rejectUnauthorized: true
//     };
//     return { ...defaultOptions, ...options };
// }

let socket: any = null;

type Props = {
    options?: any,
    children: React.ReactNode,
};

function SocketIOClient(props: Props) {

    const {
        // serverAddress,
    } = useContext(AppContext);

    // useEffect(() => {
    //     if (serverAddress) {
    //         socket = SocketIO(serverAddress, mergeOptions(props.options));

    //         socket.status = 'initialized';

    //         socket.on('connect', () => {
    //             socket.status = 'connected';
    //             debug('connected');
    //         });

    //         socket.on('disconnect', () => {
    //             socket.status = 'disconnected';
    //             debug('disconnect');
    //         });

    //         socket.on('error', (err) => {
    //             socket.status = 'failed';
    //             warning('error', err);
    //         });

    //         socket.on('reconnect', (data) => {
    //             socket.status = 'connected';
    //             debug('reconnect', data);
    //         });

    //         socket.on('reconnect_attempt', () => {
    //             debug('reconnect_attempt');
    //         });

    //         socket.on('reconnecting', () => {
    //             socket.status = 'reconnecting';
    //             debug('reconnecting');
    //         });

    //         socket.on('reconnect_failed', (error) => {
    //             socket.status = 'failed';
    //             warning('reconnect_failed', error);
    //         });
    //     }
    // }, [ serverAddress ]);

    return (
        <SocketContext.Provider value={socket}>
            {React.Children.only(props.children)}
            <SocketIOEvent
                event="message"
                handler={(message) => console.log("React Socket " + message)}
            />
        </SocketContext.Provider>
    );
}

export default SocketIOClient;
