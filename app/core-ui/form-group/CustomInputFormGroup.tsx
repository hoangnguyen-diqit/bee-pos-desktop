import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import classNames from "classnames";

import { 
    CustomInput,
    FormFeedback,
    FormGroup,
    FormText,
    Label,
} from "reactstrap";

type Props = {
    type?: any,
    className?: string,
    label?: string,
    placeholder?: string,
    id?: string,
    name?: string,
    value?: string, // for select, file, checkbox
    checked?: boolean, // for radio
    helpText?: string,
    errorMessage?: string,
    disabled?: boolean,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onKeyPress?: KeyboardEventHandler,
    [key: string]: any,
};

const defaultProps = {
    type: "",
    helpText: "",
    errorMessage: "",
    disabled: false,
};

export function CustomInputFormGroup({
    type,
    className,
    label,
    placeholder,
    id,
    name,
    value,
    checked,
    helpText,
    errorMessage,
    disabled,
    onChange,
    onKeyPress,
    ...props
}: Props) {

    return (
        <FormGroup className={classNames(className)}>
            {!!label && type !== "checkbox" && type !== "radio" && type !== "switch" && <Label>{label}</Label>}
            <CustomInput
                type={type}
                label={label}
                placeholder={placeholder}
                id={id}
                name={name}
                value={value}
                checked={checked}
                invalid={!!errorMessage}
                disabled={disabled}
                onChange={onChange}
                onKeyPress={onKeyPress}
                {...props}
            />
            {!!errorMessage &&
                <FormFeedback
                    invalid={!!errorMessage}
                >
                    {errorMessage}
                </FormFeedback>
            }
            {!!helpText &&
                <FormText>
                    {helpText}
                </FormText>
            }
        </FormGroup>
    )
};

CustomInputFormGroup.defaultProps = defaultProps;
