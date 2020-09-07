import React from "react";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap";

type Props = {
    isOpen: boolean,
    toggleOpen: () => void,
    onOk?: (data) => void,
};

const defaultProps = {
    isOpen: false,
}

export function ToppingsSelectPopup({
    isOpen,
    toggleOpen,
    onOk,
}: Props) {

    const _handleOkClick = () => {
        if (typeof onOk === "function") {
            onOk({

            })
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            toggle={toggleOpen}
            size="lg"
            centered={true}
        >
            <ModalHeader
            >
                Combo and toppings
            </ModalHeader>
            <ModalBody>
                <div>

                </div>
            </ModalBody>
            <ModalFooter>
                <Button
                    onClick={_handleOkClick}
                >
                    Ok
                </Button>
            </ModalFooter>
        </Modal>
    )
}

ToppingsSelectPopup.defaultProps = defaultProps;
