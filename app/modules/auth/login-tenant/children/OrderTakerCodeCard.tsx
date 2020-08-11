import React from "react";
import isEmpty from "validator/lib/isEmpty";
import { Button } from "reactstrap";

import { validations } from "../../../../locales/en";

import { apiAuth_login } from "../../../../core/api-service/UserService";

import { AppContext } from "../../../../AppContext";

import { InputFormGroup } from "../../../../core-ui/form-group/InputFormGroup";

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
        username: "",
        password: "",
    },
    fieldErrors: {
        username: "",
        password: "",
    },
};

export function OrderTakerCodeCard() {

    const [ fields, dispatchFields ] = React.useReducer(fieldsReducer, initialState.fields);
    const [ fieldErrors, dispatchFieldErrors ] = React.useReducer(fieldErrorsReducer, initialState.fieldErrors);

    const validationsI18n = validations;

    const {
        history,
        updateProfile,
    } = React.useContext(AppContext);

    const _handleStoreAuth = (data) => {
        apiAuth_login({ username: data.username, password: data.password })
            .then(res => {
                console.log(res);
                updateProfile({
                    id: res.uuid,
                })
                if (history) {
                    history.push(`/home`);
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
        _submitForm({

        })
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

    const _submitForm = (data?) => {
        dispatchFieldErrors(initialState.fieldErrors);
        if (_validateForm()) {
            _handleStoreAuth(fields);
        }
    }

    return (
        <div className="bg-white p-3" style={{ width: "576px" }}>
            <p className="text-center">Please put in your Staff ID</p>
            <InputFormGroup
                label="Username"
                value={fields.username}
                errorMessage={fieldErrors.username}
                onChange={(ev) => _handleInputChange("username", ev.currentTarget.value)}
                onKeyPress={(ev) => {
                    if (ev.key === "Enter") _submitForm();
                }}
            />
            <InputFormGroup
                type="password"
                label="Password"
                value={fields.password}
                errorMessage={fieldErrors.password}
                onChange={(ev) => _handleInputChange("password", ev.currentTarget.value)}
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
