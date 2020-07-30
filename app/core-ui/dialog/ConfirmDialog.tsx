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

export function ConfirmDialog({
    isOpen,
    toggleOpen,
    value,
    onChange,
}: Props) {

    const _handleOpened = () => {

    }

    const _handleCancelClick = () => {
        if (onChange) {
            onChange("cancel", {
            })
        }
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
                        onClick={() => _handleCancelClick()}
                    >
                        Cancel
                    </Button>
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

ConfirmDialog.defaultProps = defaultProps;
