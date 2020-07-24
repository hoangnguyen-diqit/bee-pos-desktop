import React from "react";
import { Button, Card, CardBody, CardHeader } from "reactstrap";

import { AppContext } from "../../AppContext";

import { InputFormGroup } from "../../core-ui/form-group/InputFormGroup";

const buttonsMap = {
    "makeTable": [ "cutTable", "kdsHistory" ],
    "cutTable": [ "makeTable", "kdsHistory" ],
    "history": [ "makeTable", "cutTable" ],
};

type Props = {
    currentPage: string,
}

const defaultProps = {

};

export function SettingSidebar({
    currentPage,
}: Props) {

    console.log("Setting sidebar rendered");
    const { history, isShowSettingBar, toggleSettingBar } = React.useContext(AppContext);

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

    return (
        <div
            className='position-fixed d-flex flex-column bg-white text-black-50 transition-right-default'
            style={{ right: isShowSettingBar ? "0" : "-360px", width: "360px", height: "calc(100% - 56px)", top: "56px" }}
        >
            <Card className="" style={{ minHeight: "100%" }}>
                <CardHeader className="d-flex">
                    <h3 className="mr-auto">Settings</h3>
                    <Button
                        onClick={() => _handleCloseClick()}
                    >
                        Close
                    </Button>
                </CardHeader>
                <CardBody>
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
                </CardBody>
                <div className="d-flex py-3">
                    {(buttonsMap["makeTable"] && buttonsMap["makeTable"].includes(currentPage)) &&
                        <div className="w-50 text-center">
                            <Button
                                color="danger"
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
