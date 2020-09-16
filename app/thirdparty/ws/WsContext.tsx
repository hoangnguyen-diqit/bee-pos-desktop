import React from 'react';
import { w3cwebsocket } from 'websocket';

type WsContextType = {
    socket?: w3cwebsocket,
}

export const WsContext = React.createContext<WsContextType>({
});
