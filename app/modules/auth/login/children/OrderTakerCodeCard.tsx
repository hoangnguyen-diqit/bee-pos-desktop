import React from "react";
import isEmpty from "validator/lib/isEmpty";
import { Button } from "reactstrap";

import { validations } from "../../../../locales/en";

import { AppContext } from "../../../../AppContext";

import { InputFormGroup } from "../../../../core-ui/form-group/InputFormGroup";
import { apiStore_login } from "../../../../core/api-service/StoreService";
import { Image } from "../../../../core-ui/image/Image";

const fieldsReducer = (state, action) => {
    return {
        ...state,
        ...action,
    };
}

const fieldErrorsReducer = (state, action) => {
    return {
        ...state,
        ...action,
    }
}

const initialState = {
    fields: {
        pinCode: "",
    },
    fieldErrors: {
        pinCode: "",
    },
};

export function OrderTakerCodeCard() {

    const [ fields, dispatchFields ] = React.useReducer(fieldsReducer, initialState.fields);
    const [ fieldErrors, dispatchFieldErrors ] = React.useReducer(fieldErrorsReducer, initialState.fieldErrors);

    const validationsI18n = validations;

    const {
        history,
    } = React.useContext(AppContext);

    const _handleStoreAuth = (pinCode) => {
        apiStore_login({ pin_code: pinCode })
            .then(res => {
                console.log(res);
                // updateProfile({
                //     uuid: res.uuid,
                // })
                if (history) {
                    history.push(`/login-tenant`);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const _handleNextClick = () => {
        // updateProfile({
        //     id: "123456",
        // })
        // if (history) {
        //     history.push(`/home`);
        // }
        _submitForm()
    }

    const _handleInputChange = (field, value) => {
        if ([""].includes(field)) {
            dispatchFields({ [field]: value });
        } else {
            const errorMessage = _validateField(field, value);
            dispatchFields({ [field]: value });
            dispatchFieldErrors({ [field]: errorMessage });
        }
    }

    const _validateField = (field, value) => {
        switch (field) {
            default:
                if (!value || isEmpty(value)) {
                    return validationsI18n.fieldIsRequired;
                } else return "";
        }
    }

    const _validateForm = () => {
        const errorMessages = {

        }

        dispatchFieldErrors({ fieldErrors: errorMessages });
        return !Object.keys(errorMessages).some(key => errorMessages[key]);
    }

    const _submitForm = () => {
        dispatchFieldErrors(initialState.fieldErrors);
        if (_validateForm()) {
            _handleStoreAuth(fields.pinCode);
        }
    }

    return (
        <div className="bg-white p-3" style={{ width: "576px" }}>
            <p className="text-center">Please scan QR code to active your Order Taker</p>
            <div className="d-flex justify-content-center">
                <Image
                    width="180px"
                />
            </div>
            <hr />
            <p className="text-center">Enter Key Manually</p>
            <InputFormGroup
                value={fields.pinCode}
                errorMessage={fieldErrors.pinCode}
                onChange={(ev) => _handleInputChange("pinCode", ev.currentTarget.value)}
                onKeyPress={(ev) => {
                    if (ev.key === "Enter") _submitForm();
                }}
            />
            <div>
                <Button
                    color="danger"
                    block
                    onClick={() => _handleNextClick()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
