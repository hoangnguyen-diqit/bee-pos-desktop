import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";

type Props = {

}

type State = {
    isOpen: boolean,
    fields: any,
    onOk?: () => void,
}

const initialState = {
    isOpen: false,
    fields: {
        message: "",
    },
    onOk: undefined,
}

export class MessageDialog extends React.Component<Props, State> {

    state: State = initialState;

    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this._handleOkClick = this._handleOkClick.bind(this);
    }

    show(data, onOk?) {
        this.setState({
            isOpen: true,
            fields: Object.assign({}, this.state.fields, data || {}),
            onOk: onOk,
        })
    }

    hide() {
        this.setState({ isOpen: false });
    }

    _handleOkClick() {
        const { onOk } = this.state;
        if (onOk) {
            onOk();
        }
        this.hide();
    }

    render() {
        const { isOpen, fields } = this.state;

        return (
            <Modal
                isOpen={isOpen}
                unmountOnClose={false}
            >
                <ModalBody>
                    {fields.message}
                    <div className="text-right">
                        <Button
                            onClick={() => this._handleOkClick()}
                        >
                            Ok
                        </Button>
                    </div>
                </ModalBody>
            </Modal>
        )
    }
}
