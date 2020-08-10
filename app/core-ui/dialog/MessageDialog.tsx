import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";

type Props = {
    isOpen: boolean,
    value: any,
    toggleOpen: () => void,
    onChange: (type, data) => void,
}

const defaultProps = {

};

export function MessageDialog({
    isOpen,
    toggleOpen,
    value,
    onChange,
}: Props) {

    const _handleOpened = () => {

    }

    const _handleOkClick = () => {
        if (onChange) {
            onChange("ok", {
            })
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={() => toggleOpen()}
            onOpened={_handleOpened}
        >
            <ModalBody>
                {value.message}
                <div className="text-right">
                    <Button
                        onClick={() => _handleOkClick()}
                    >
                        Ok
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    )
}

MessageDialog.defaultProps = defaultProps;
