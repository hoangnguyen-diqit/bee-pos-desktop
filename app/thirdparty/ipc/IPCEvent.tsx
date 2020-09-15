import React from 'react';
import { ipcRenderer } from 'electron';

import { IPCClientContext } from './IPCClientContext';

type Props = {
    event: string,
    handler: (data) => void,
};

class IPCEvent extends React.Component<Props> {

    static contextType = IPCClientContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { event, handler } = this.props;

        ipcRenderer.on(event, handler);
    }

    componentWillUnmount() {
        const { event, handler } = this.props;

        ipcRenderer.removeListener(event, handler);
    }

    render() {
        return false;
    }
}

export default IPCEvent;
