import React from 'react';

import { IPCClientContext } from "./IPCClientContext";
import IPCEvent from './IPCEvent';

export function IPCClient(props) {

    return (
        <IPCClientContext.Provider value={{}}>
            {React.Children.only(props.children)}
            <IPCEvent
                event="message"
                handler={(message) => console.log("React Socket " + message)}
            />
        </IPCClientContext.Provider>
    )
}
