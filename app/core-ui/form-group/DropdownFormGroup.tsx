import React from "react";
import classNames from "classnames";
import {
    FormFeedback,
    FormGroup,
    FormText,
    Label,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
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
    [key: string]: any,
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

export function DropdownFormGroup({
    className,
    style,
    label,
    placeholder,
    id,
    options,
    value,
    errorMessage,
    helpText,
    size,
    onChange,
}: Props) {

    const _parseLabel = () => {
        if (Array.isArray(value)) {
            return value ? options.filter(item => value.includes(item.value)).map(item => item.label).join(", ") : placeholder;
        } else {
            return value ? options.filter(item => value === item.value).map(item => item.label).join("") : placeholder;
        }
    };

    const _handleItemClick = (item) => {
        if (Array.isArray(value)) {
            const currentValue = [...(value || [])];
            const foundIndex = currentValue.findIndex(sItem => sItem === item.value);
            if (foundIndex > -1) {
                currentValue.splice(foundIndex, 1);
            } else {
                currentValue.push(item.value);
            }

            if (onChange) {
                onChange(currentValue);
            }
        } else {
            if (onChange) {
                onChange(item.value);
            }
        }
    }

    const _renderOptionItem = (item, index) => {
        return (
            <DropdownItem
                key={index}
                onClick={() => _handleItemClick(item)}
            >
                {item.label}
            </DropdownItem>
        )
    }

    return (
        <FormGroup className={className} style={style}>
            {label && <Label for={id || "input_form_group_01"}>{label}</Label>}
            <UncontrolledDropdown
                className={classNames("dropdown-select", { "is-invalid": !!errorMessage })}
            >
                <DropdownToggle
                    size={size}
                    className="w-100 d-flex align-items-center justify-content-between"
                    caret
                >
                    {_parseLabel()}
                </DropdownToggle>
                <DropdownMenu
                    className="w-100"
                    right
                >
                    {(Array.isArray(options) && options.length > 0) &&
                        options
                        .map((item, index) => _renderOptionItem(item, index))
                    }
                </DropdownMenu>
            </UncontrolledDropdown>
            {!!errorMessage &&
                <FormFeedback>{errorMessage}</FormFeedback>
            }
            {!!helpText &&
                <FormText>{helpText}</FormText>
            }
        </FormGroup>
    );
}

DropdownFormGroup.defaultProps = defaultProps;
