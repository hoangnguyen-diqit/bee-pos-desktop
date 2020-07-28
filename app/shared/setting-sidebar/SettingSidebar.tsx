import React from "react";
import { Button, Card, CardBody, CardHeader } from "reactstrap";

import { AppContext } from "../../AppContext";

import { InputFormGroup } from "../../core-ui/form-group/InputFormGroup";
import { ReactSelectFormGroup } from "../../core-ui/form-group/ReactSelectFormGroup";

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

type Props = {
    currentPage: string,
}

const defaultProps = {

};

const initialState = {
    fields: {
        layout: "3x4",
    },
}

export function SettingSidebar({
    currentPage,
}: Props) {

    console.log("Setting sidebar rendered");
    const { history, isShowSettingBar, toggleSettingBar } = React.useContext(AppContext);
    const [ fields, dispatchFields ] = React.useReducer(fieldsReducer, initialState.fields);

    const _handleCloseClick = () => {
        if (toggleSettingBar) {
            toggleSettingBar(false);
        }
    };

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

    const _handleInputChange = (field, value) => {
        dispatchFields({ [field]: value });
    }

    return (
        <div
            className='position-fixed d-flex flex-column bg-white text-black-50 transition-right-default'
            style={{ right: isShowSettingBar ? "0" : "-360px", width: "360px", height: "calc(100% - 56px)", top: "56px" }}
        >
            <Card className="" style={{ minHeight: "100%" }}>
                <CardHeader className="d-flex">
                    <h3 className="mr-auto mb-0">Settings</h3>
                    <Button
                        color="light"
                        className="p-0"
                        onClick={() => _handleCloseClick()}
                    >
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                            <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
                        </svg>
                        Close
                    </Button>
                </CardHeader>
                <CardBody>
                    <ReactSelectFormGroup
                        label="Layout"
                        options={[
                            { value: "3x4", label: "3x4" },
                            { value: "2x4", label: "2x4" },
                        ]}
                        value={fields.layout}
                        isClearable={false}
                        onChange={(s0 => _handleInputChange("layout", s0.value))}
                    />
                    <InputFormGroup
                        type="select"
                        label="Layout"
                    >
                        <option>2x4</option>
                        <option>3x4</option>
                    </InputFormGroup>
                    <InputFormGroup
                        type="select"
                        label="Category"
                    >
                        <option>2x4</option>
                        <option>3x4</option>
                    </InputFormGroup>
                    <InputFormGroup
                        type="select"
                        label="Option"
                    >
                        <option>2x4</option>
                        <option>3x4</option>
                    </InputFormGroup>
                    <InputFormGroup
                        type="select"
                        label="Language"
                    >
                        <option>2x4</option>
                        <option>3x4</option>
                    </InputFormGroup>
                    <div className="text-center">
                        <Button
                            color="danger"
                            outline
                        >
                            Change layout
                        </Button>
                    </div>
                </CardBody>
                <div className="d-flex py-3">
                    {(buttonsMap["makeTable"] && buttonsMap["makeTable"].includes(currentPage)) &&
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
                    {(buttonsMap["cutTable"] && buttonsMap["cutTable"].includes(currentPage)) &&
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
                    {(buttonsMap["history"] && buttonsMap["history"].includes(currentPage)) &&
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
        </div>
    )
}

SettingSidebar.defaultProps = defaultProps;
