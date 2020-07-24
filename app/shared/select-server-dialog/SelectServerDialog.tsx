import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";

import { InputFormGroup } from "../../core-ui/form-group/InputFormGroup";

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
        serverIP: "",
    },
    onOk: undefined,
}

export class SelectServerDialog extends React.Component<Props, State> {

    state: State = initialState;

    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this._handleInputChange = this._handleInputChange.bind(this);
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

    _handleInputChange(fieldName, value) {
        this.setState({
            fields: Object.assign({}, this.state.fields, { [fieldName]: value })
        })
    }

    render() {
        const { isOpen, fields } = this.state;

        return (
            <Modal
                isOpen={isOpen}
            >
                <ModalBody>
                    <InputFormGroup
                        label="Enter ServerIP to connect"
                        placeholder="192.168.9.38"
                        value={fields.serverIP}
                        onChange={(ev) => this._handleInputChange("serverIP", ev.currentTarget.value)}
                    />
                    <div className="text-right">
                        <Button
                            onClick={() => this._handleConnectClick({ serverIP: fields.serverIP })}
                        >
                            Connect
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
