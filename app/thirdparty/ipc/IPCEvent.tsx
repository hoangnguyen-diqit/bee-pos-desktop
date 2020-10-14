import { useContext, useEffect } from 'react';

import { IPCClientContext } from './IPCClientContext';

type Props = {
    event: string,
    handler: (data) => void,
};

function IPCEvent(props: Props) {

    const { event, handler } = props;
    const { ipcConnected, ipcEventMap } = useContext(IPCClientContext);

    useEffect(() => {
        ipcEventMap[event] = handler;

        return (() => {
            if (ipcEventMap[event]) {
                delete ipcEventMap[event];
            }
        })
    }, [ ipcConnected ])

    return null;
}

export default IPCEvent;

