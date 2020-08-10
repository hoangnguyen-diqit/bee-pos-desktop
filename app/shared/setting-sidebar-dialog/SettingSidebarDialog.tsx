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
    // size: "sm",
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

export function SettingSidebarDialog({
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
                <Card className="" style={{ minHeight: "100%" }}>
                    <CardHeader className="d-flex">
                        <h3 className="mr-auto mb-0">Settings</h3>
                        <Button
                            color="light"
                            className="p-0"
                            onClick={() => toggleOpen()}
                        >
                            <Icon path={mdiClose} size={1} />
                            Close
                        </Button>
                    </CardHeader>
                    <CardBody className="bg-white">
                        <DropdownFormGroup
                            label="Layout"
                            options={[
                                { value: "3x4", label: "3x4" },
                                { value: "2x4", label: "2x4" },
                            ]}
                            value={settingLayout}
                            isClearable={false}
                            onChange={(s0 => updateSettingLayout(s0))}
                        />
                        <DropdownFormGroup
                            label="Make table Category"
                            placeholder="Nothing is selected"
                            options={[
                            ]}
                            value={fields.category}
                            isClearable={false}
                            onChange={(s0 => _handleInputChange("category", s0))}
                        />
                        <label>Options</label>
                        <ListGroup tag="div">
                            <ListGroupItem
                                tag="button"
                                className="d-flex justify-content-between"
                                onClick={_handleSetupPrinterClick}
                            >
                                <span>Setup Printer</span>
                                <Icon path={mdiChevronRight} size={1}/>
                                {/* <ChevronRightIcon /> */}
                            </ListGroupItem>
                        </ListGroup>
                        <DropdownFormGroup
                            label="Language"
                            placeholder="Select"
                            options={[
                                { value: "English", label: "English" },
                            ]}
                            value={fields.language}
                            isClearable={false}
                            onChange={(s0 => _handleInputChange("language", s0))}
                        />
                        <div className="text-center">
                            <Button
                                color="danger"
                            >
                                Change Layout
                            </Button>
                        </div>
                    </CardBody>
                    <div className="d-flex py-3">
                        {(buttonsMap["makeTable"] && buttonsMap["makeTable"].includes(value.currentPage)) &&
                            <div className="w-50 text-center">
                                <Button
                                    color="danger"
                                    size="lg"
                                    outline={true}
                                    onClick={() => _handleButtonClick("makeTable")}
                                >
                                    Make Table
                                </Button>
                            </div>
                        }
                        {(buttonsMap["cutTable"] && buttonsMap["cutTable"].includes(value.currentPage)) &&
                            <div className="w-50 text-center">
                                <Button
                                    color="danger"
                                    size="lg"
                                    outline={true}
                                    onClick={() => _handleButtonClick("cutTable")}
                                >
                                    Cut Table
                                </Button>
                            </div>
                        }
                        {(buttonsMap["history"] && buttonsMap["history"].includes(value.currentPage)) &&
                            <div className="w-50 text-center">
                                <Button
                                    color="danger"
                                    size="lg"
                                    outline={true}
                                    onClick={() => _handleButtonClick("history")}
                                >
                                    History
                                </Button>
                            </div>
                        }
                    </div>
                </Card>
            </ModalBody>
        </Modal>
    )
}

SettingSidebarDialog.defaultProps = defaultProps;
