import { useContext, useEffect } from 'react';

import { WsContext } from './WsContext';

type Props = {
    event: string,
    handler: (data) => void,
};

function WsEvent(props: Props) {

    const { event, handler } = props;
    const { socket, wsEventMap } = useContext(WsContext);

    useEffect(() => {
        wsEventMap[event] = handler;

        return (() => {
            if (wsEventMap[event]) {
                delete wsEventMap[event];
            }
        })
    }, [ socket, wsEventMap ])

    return null;
}

export default WsEvent;
