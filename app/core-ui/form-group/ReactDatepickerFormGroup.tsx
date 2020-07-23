import React from "react";
import classNames from "classnames";
import DatePicker from "react-datepicker";

type Props = {
    name: string,
    value: string | number | Date,
    label: string,
    placeholder: string,
    dateFormat: string,
    timeFormat: string | boolean,
    errorMessage: string,
    onChange: Function,
    handleInputBlur?: Function,
    className: string,
    inputClassName: string,
    disabled: boolean,
    isValidDate?: Function,
    minDate?: string,
    isClearable: boolean,
    isShowCalendarIcon: boolean,
};

const defaultProps = {
    name: "",
    label: "",
    placeholder: "",
    dateFormat: "dd-MM-yyyy",
    timeFormat: false,
    errorMessage: "",
    inputClassName: "form-control",
    disabled: false,
    isClearable: true,
    isShowCalendarIcon: true,
};

export function ReactDatepickerFormGroup({
    value,
    label,
    placeholder,
    dateFormat,
    timeFormat,
    errorMessage,
    onChange,
    handleInputBlur,
    className,
    inputClassName,
    isValidDate,
    minDate,
    disabled,
    isClearable,
    isShowCalendarIcon,
}: Props) {

    return (
        <div className={classNames("datepicker-input", className)}>
            {label && <label htmlFor="username">{label}</label>}
            <div className={classNames("react-datepicker-wrap", {"is-invalid": !!errorMessage})}>
                <DatePicker
                    selected={value}
                    dateFormat={dateFormat}
                    // timeFormat={timeFormat}
                    utc={false}
                    onChange={onChange}
                    onBlur={handleInputBlur}
                    className={classNames(inputClassName, {"is-invalid": !!errorMessage})}
                    inputClassName={classNames("", {"is-invalid": !!errorMessage})}
                    closeOnSelect={true}
                    // isValidDate={ isValidDate || null }
                    minDate={ minDate || null }
                    placeholderText={placeholder}
                    disabled={disabled}
                    isClearable={isClearable}
                    isShowCalendarIcon={isShowCalendarIcon}
                    fixedHeight
                    // todayButton={"Today"}
                />
            </div>
            {!!errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
        </div>
    );
};

ReactDatepickerFormGroup.defaultProps = defaultProps;
