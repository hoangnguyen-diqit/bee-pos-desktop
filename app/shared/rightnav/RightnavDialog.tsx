import React from "react";
import { Modal, ModalBody } from "reactstrap";

type Props = {
    isOpen: boolean,
    value: any,
    validationsI18n?: any,
    i18n?: any,
    size?: string,
    toggleOpen: () => void,
    onChange: (data) => void,
}

const defaultProps = {
    size: "sm",
    validationsI18n: {},
    i18n: {},
};

export function RightnavDialog({
    isOpen,
    size,
    toggleOpen,
}: Props) {

    const _handleOpened = () => {
    }

    return (
        <Modal
            isOpen={isOpen}
            size={size}
            className="anchor-right"
            // className="modal-fullscreen"
            modalClassName="right"
            // modalClassName="zoom"
            // centered
            // scrollable={true}
            toggle={() => toggleOpen()}
            onOpened={_handleOpened}
        >
            <ModalBody className="p-0">
            </ModalBody>
        </Modal>
    )
}

RightnavDialog.defaultProps = defaultProps;
