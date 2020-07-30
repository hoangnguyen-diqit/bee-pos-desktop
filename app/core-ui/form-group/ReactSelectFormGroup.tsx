import React from "react";
import classNames from "classnames";
import Select from 'react-select';
import {
    FormFeedback,
    FormGroup,
    FormText,
    Label,
} from "reactstrap";

type Props = {
    name?: string,
    options: any[],
    value: string | number | string[],
    className?: string,
    style?: any,
    label?: string,
    placeholder?: string,
    id?: string,
    isClearable?: boolean,
    isSearchable?: boolean,
    isDisabled?: boolean,
    isMulti?: boolean,
    errorMessage?: string,
    helpText?: string,
    disabled?: boolean,
    onChange?: Function,
};

const defaultProps = {
    options: [],
    style: {},
    isClearable: true,
    isSearchable: true,
    isDisabled: false,
    isMulti: false,
};

// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' },
// ];

// const value = { value: "chocolate", label: "Chocolate" };

// const value = [
//     { value: "chocolate", label: "Chocolate" };
//     { value: 'vanilla', label: 'Vanilla' },
// ];

export function ReactSelectFormGroup({
    className,
    style,
    label,
    placeholder,
    id,
    name,
    options,
    value,
    isClearable,
    isSearchable,
    isMulti,
    disabled,
    errorMessage,
    helpText,
    onChange,
}: Props) {
    const _parseValue = () => {
        if (Array.isArray(value)) {
            return options.filter(item => value.includes(item.value));
        } else {
            return options.filter(item => value === item.value);
        }
    };

    return (
        <FormGroup className={className} style={style}>
            {label && <Label for={id || "input_form_group_01"}>{label}</Label>}
            <Select
                className={classNames("react-select-input", { "is-invalid": !!errorMessage })}
                placeholder={placeholder}
                value={_parseValue()}
                onChange={onChange}
                options={options.filter(fItem => fItem.value !== value)}
                name={name}
                isClearable={isClearable}
                isSearchable={isSearchable}
                isDisabled={disabled}
                isMulti={isMulti}
            />
            {!!errorMessage &&
                <FormFeedback>{errorMessage}</FormFeedback>
            }
            {!!helpText &&
                <FormText>{helpText}</FormText>
            }
        </FormGroup>
    );
}

ReactSelectFormGroup.defaultProps = defaultProps;
