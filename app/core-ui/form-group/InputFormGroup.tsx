import React, { ChangeEventHandler, KeyboardEventHandler } from "react";
import classNames from "classnames";
import {
    Input,
    FormFeedback,
    FormGroup,
    FormText,
    Label,
} from "reactstrap";
import { InputType } from "reactstrap/lib/Input";

type Props = {
    type?: InputType,
    className?: string,
    inputClassName?: string,
    label?: string,
    placeholder?: string,
    id?: string,
    name?: string,
    value?: string | number,
    errorMessage?: string,
    helpText?: string,
    disabled?: boolean,
    inline?: boolean,
    innerRef?: any,
    rightIcon?: string,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onKeyPress?: KeyboardEventHandler,
    onRightIconClick?: (event: any) => void,
    [key: string]: any,
};

const defaultProps = {
    type: "text",
    className: "mb-3",
    label: "",
    placeholder: "",
    name: "",
    errorMessage: "",
    helpText: "",
    disabled: false,
    inline: false,
};

export function InputFormGroup({
    type,
    innerRef,
    className,
    inputClassName,
    id,
    name,
    value,
    label,
    placeholder,
    errorMessage,
    helpText,
    rightIcon,
    disabled,
    inline,
    onRightIconClick,
    onChange,
    onKeyPress,
    ...props
}: Props) {

    const renderInput = () => {
        return (
            <Input
                type={type}
                innerRef={innerRef}
                className={inputClassName}
                placeholder={placeholder}
                name={name}
                value={value}
                invalid={!!errorMessage}
                disabled={disabled}
                onChange={onChange}
                onKeyPress={onKeyPress}
                {...props}
            />
        )
    }

    if (inline) {
        return (
            <React.Fragment>
                {renderInput()}
            </React.Fragment>
        )
    }
    return (
        <FormGroup className={className}>
            {label && <Label for={id || "input_form_group_01"}>{label}</Label>}
            <div className={classNames("d-flex align-items-center", { "form-control-wrap is-invalid": !!errorMessage })}>
                {renderInput()}
            </div>
            {!!errorMessage &&
                <FormFeedback>{errorMessage}</FormFeedback>
            }
            {!!helpText &&
                <FormText>{helpText}</FormText>
            }
        </FormGroup>
    );
};

InputFormGroup.defaultProps = defaultProps;
