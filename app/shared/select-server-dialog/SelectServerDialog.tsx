import React from "react";
import isEmpty from "validator/lib/isEmpty";
import { Modal, ModalBody, Button } from "reactstrap";

import { InputFormGroup } from "../../core-ui/form-group/InputFormGroup";

type Props = {

}

type State = {
    isOpen: boolean,
    fields: any,
    fieldErrors: any,
    onOk?: (data) => void,
}

const initialState = {
    isOpen: false,
    fields: {
        serverIP: "",
    },
    fieldErrors: {
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

    _handleInputChange(fieldName, value) {
        if ([""].includes(fieldName)) {
            this.setState({
                fields: Object.assign({}, this.state.fields, { [fieldName]: value })
            })
        } else {
            const errorMessage = this._validateField(fieldName, value);
            this.setState({
                fields: Object.assign({}, this.state.fields, { [fieldName]: value }),
                fieldErrors: Object.assign({}, this.state.fieldErrors, { [fieldName]: errorMessage }),
            })
        }
    }

    _validateField(fieldName, value) {
        switch (fieldName) {
            default:
                if (!value || isEmpty(value)) {
                    return "Field is required";
                } else return "";
        }
    }

    _validateForm() {
        const { fields } = this.state;

        const errorMessages = {
            serverIP: this._validateField("serverIP", fields.serverIP),
        }

        this.setState({ fieldErrors: errorMessages });
        return !Object.keys(errorMessages).some(key => errorMessages[key]);
    }

    _submitForm(data) {
        this.setState({ fieldErrors: {} }, () => {
            if (this._validateForm()) {
                const { onOk } = this.state;
                if (onOk) {
                    onOk(data);
                    this.hide();
                }
            }
        })
    }

    render() {
        const { isOpen, fields, fieldErrors } = this.state;

        return (
            <Modal
                isOpen={isOpen}
            >
                <ModalBody>
                    <InputFormGroup
                        label="Enter ServerIP to connect"
                        placeholder="192.168.9.38"
                        value={fields.serverIP}
                        errorMessage={fieldErrors.serverIP}
                        onChange={(ev) => this._handleInputChange("serverIP", ev.currentTarget.value)}
                    />
                    <div className="text-right">
                        <Button
                            onClick={() => {}}
                        >
                            Connect
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
