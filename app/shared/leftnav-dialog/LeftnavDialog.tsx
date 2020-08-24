import React from "react";
import Icon from "@mdi/react";
import { mdiClose, mdiChevronRight } from "@mdi/js";
import electronSettings from "electron-settings";
import isEmpty from "validator/lib/isEmpty";
import { Modal, ModalBody, Button, Card, CardHeader, CardBody, ListGroup, ListGroupItem } from "reactstrap";
import { ipcRenderer } from "electron";

import { DEFAULT_PRINTER_NAME } from "../../utils/Constants";

import { AppContext } from "../../AppContext";

import { DropdownFormGroup } from "../../core-ui/form-group/DropdownFormGroup";
import { LeftnavContent } from "./LeftnavContent";

const buttonsMap = {
    "makeTable": [ "cutTable", "kdsHistory" ],
    "cutTable": [ "makeTable", "kdsHistory" ],
    "history": [ "makeTable", "cutTable" ],
};

const fieldsReducer = (state, action) => {
    return {
        ...state,
        ...action,
    }
}

const fieldErrorsReducer = (state, action) => {
    return {
        ...state,
        ...action,
    }
}

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

const initialState = {
    fields: {
        optionNames: "",
        note: "",
        layout: "3x4",
    },
    fieldErrors: {
        optionNames: "",
        note: "",
    },
}

export function LeftnavDialog({
    isOpen,
    value,
    validationsI18n,
    size,
    toggleOpen,
    onChange,
}: Props) {

    const {
        history,
        settingLayout,
        updateSettingLayout,
        showPrinterSetupDialog,
    } = React.useContext(AppContext);
    const [ fields, dispatchFields ] = React.useReducer(fieldsReducer, Object.assign({}, initialState.fields, value || {}));
    const [ fieldErrors, dispatchFieldErrors ] = React.useReducer(fieldErrorsReducer, initialState.fieldErrors);
    const _validationsI18n = validationsI18n || {};

    const _handleOpened = () => {
    }

    const _handleItemClick = (item) => {
        const currentOptionNames = [...(fields.optionNames || [])];
        const foundIndex = currentOptionNames.findIndex(sItem => sItem === item.value);
        if (foundIndex > -1) {
            currentOptionNames.splice(foundIndex, 1);
        } else {
            currentOptionNames.push(item.value);
        }

        dispatchFields({ optionName: currentOptionNames });
    }

    const _handleCancelClick = () => {
        if (onChange) {
            toggleOpen();
            onChange({
                type: "cancel",
                data: {},
            })
        }
    }

    const _handleOkClick = () => {
        _submitForm({

        })
    }

    const _handleSetupPrinterClick = () => {
        if (showPrinterSetupDialog) {
            showPrinterSetupDialog();
        }
    }

    const _handleButtonClick = (buttonName) => {
        let link = "";
        switch (buttonName) {
            case "makeTable":
                link = "/make-table";
                break;
            case "cutTable":
                link = "/cut-table";
                break;
            case "history":
                link = "/kds-history";
                break;
        }

        if (history) {
            history.push(link);
        }
    }

    const _handleInputChange = (fieldName, value) => {
        if ([""].includes(fieldName)) {
            dispatchFields({ [fieldName]: value });
        } else {
            const errMsg = _validateField(fieldName, value);
            dispatchFields({ [fieldName]: value });
            dispatchFieldErrors({ [fieldName]: errMsg });
        }
    }

    const _validateField = (fieldName, value) => {
        switch (fieldName) {
            default:
                if (!value || isEmpty(value)) {
                    return _validationsI18n.fieldIsRequired;
                } return "";
        }
    }

    const _validateForm = () => {
        const errorMessages = {
        }

        return !Object.keys(errorMessages).some(key => errorMessages[key]);
    }

    const _submitForm = (data) => {
        dispatchFieldErrors(initialState.fieldErrors);
        if (_validateForm()) {
            const defaultPrinterName = electronSettings.getSync(DEFAULT_PRINTER_NAME);
            console.log("Default printer: " + defaultPrinterName);
            if (defaultPrinterName) {
                ipcRenderer.on("printFileResp", (ev, args) => {
                    if (toggleOpen) {
                        toggleOpen();
                    }
                });

                ipcRenderer.send("printFile", {
                    printerName: defaultPrinterName,
                });
            }

            if (onChange) {
                onChange({
                    type: "ok",
                    data: {
                        optionNames: fields.optionNames,
                        note: fields.note,
                    },
                })
            }
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            size={size}
            className="anchor-left"
            // className="modal-fullscreen"
            modalClassName="left"
            // modalClassName="zoom"
            // centered
            // scrollable={true}
            toggle={() => toggleOpen()}
            onOpened={_handleOpened}
        >
            <ModalBody className="p-0">
                <LeftnavContent
                />
            </ModalBody>
        </Modal>
    )
}

LeftnavDialog.defaultProps = defaultProps;
