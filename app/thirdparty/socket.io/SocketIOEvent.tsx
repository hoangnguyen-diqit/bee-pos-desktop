import React from 'react';

import { SocketContext } from './SocketContext';
import { warning } from './utils';

type Props = {
    event: string,
    handler: (data) => void,
};

class SocketIOEvent extends React.Component<Props> {

    static contextType = SocketContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { event, handler } = this.props;
        const socket = this.context;

        if (!socket) {
            warning('Socket IO connection has not been established.');
            return;
        }

        socket.on(event, handler);
    }

    componentWillUnmount() {
        const { event, handler } = this.props;
        const socket = this.context;

        if (!socket) {
            warning('Socket IO connection has not been established.');
            return;
        }

        socket.off(event, handler);
    }

    render() {
        return false;
    }
}

export default SocketIOEvent;
