import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";

type Props = {

}

type State = {
    isOpen: boolean,
    fields: any,
    onOk?: (data) => void,
}

const initialState = {
    isOpen: false,
    fields: {
        message: "",
    },
    onOk: undefined,
}

export class ServerDetectedDialog extends React.Component<Props, State> {

    state: State = initialState;

    constructor(props) {
        super(props);

        this.show = this.show.bind(this);

        this._handleConnectClick = this._handleConnectClick.bind(this);
    }

    show(data, onOk) {
        this.setState({
            isOpen: true,
            fields: Object.assign({}, this.state.fields, data || {}),
            onOk: onOk,
        })
    }

    hide() {
        this.setState({ isOpen: false });
    }

    _handleConnectClick(data) {
        const { onOk } = this.state;
        if (onOk) {
            onOk(data);
            this.hide();
        }
    }

    render() {
        const { isOpen, fields } = this.state;

        return (
            <Modal
                isOpen={isOpen}
            >
                <ModalBody>
                    <h3>Server detected:</h3>
                    {fields.message}
                    <div className="text-right">
                        <Button
                            onClick={() => this._handleConnectClick({ serverIP: fields.message })}
                        >
                            Connect
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
