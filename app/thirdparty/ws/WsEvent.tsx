import { useContext, useEffect } from 'react';

import { WsContext } from './WsContext';
import { wsEventMap } from './utils';

type Props = {
    event: string,
    handler: (data) => void,
};

function WsEvent(props: Props) {

    const { event, handler } = props;
    const { socket } = useContext(WsContext);

    useEffect(() => {
        wsEventMap[event] = handler;

        return (() => {
            if (wsEventMap[event]) {
                delete wsEventMap[event];
            }
        })
    }, [ socket ])

    return null;
}

export default WsEvent;
