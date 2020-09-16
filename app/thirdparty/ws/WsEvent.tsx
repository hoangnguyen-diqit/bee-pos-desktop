import React from 'react';

import { WsContext } from './WsContext';
import { warning } from './utils';

type Props = {
    event: string,
    handler: (data) => void,
};

class WsEvent extends React.Component<Props> {

    static contextType = WsContext;

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { handler } = this.props;
        const { socket } = this.context;

        if (!socket) {
            warning('Socket IO connection has not been established.');
            return;
        }

        socket.onmessage(handler);
    }

    componentWillUnmount() {
        const { socket } = this.context;

        if (!socket) {
            warning('Socket IO connection has not been established.');
            return;
        }
    }

    render() {
        return false;
    }
}

export default WsEvent;
