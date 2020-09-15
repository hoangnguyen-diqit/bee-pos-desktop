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

export default WsEvent;
