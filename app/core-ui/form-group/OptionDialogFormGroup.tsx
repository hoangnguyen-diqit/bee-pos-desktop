import React from "react";
import isEmpty from "validator/lib/isEmpty";
import { Modal, ModalBody, Button, ListGroup, ListGroupItem } from "reactstrap";

import { InputFormGroup } from "./InputFormGroup";

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
    options: any[],
    value: any,
    validationsI18n: any,
    i18n?: any,
    size?: string,
    toggleOpen: () => void,
    onChange: (data) => void,
}

const defaultProps = {
    validationsI18n: {},
    i18n: {},
};

const initialState = {
    fields: {
        optionNames: "",
        note: "",
    },
    fieldErrors: {
        optionNames: "",
        note: "",
    },
}

export function OptionDialogFormGroup({
    isOpen,
    options,
    value,
    validationsI18n,
    size,
    toggleOpen,
    onChange,
}: Props) {

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
            onChange({
                type: "cancel",
                data: {},
            })
        }
    }

    const _handleOkClick = () => {
        _submitForm()
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

    const _submitForm = () => {
        dispatchFieldErrors(initialState.fieldErrors);
        if (_validateForm()) {
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
            scrollable={true}
            toggle={() => toggleOpen()}
            onOpened={_handleOpened}
        >
            <ModalBody>
                <ListGroup>
                {(Array.isArray(options) && options.length > 0) &&
                    options
                        .map((item, index) => {
                            return (
                                <ListGroupItem
                                    key={index}
                                    onClick={() => _handleItemClick(item)}
                                >
                                    {item.label}
                                </ListGroupItem>
                            )
                        })
                }
                </ListGroup>
                <div>
                    <InputFormGroup
                        type="textarea"
                        label="note"
                        value={fields.note}
                        errorMessage={fieldErrors.note}
                        onChange={(ev) => _handleInputChange("note", ev.currentTarget.value)}
                    />
                </div>
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

OptionDialogFormGroup.defaultProps = defaultProps;
