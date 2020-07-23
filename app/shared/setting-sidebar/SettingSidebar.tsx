import React from "react";
import { Button, Input } from "reactstrap";

import { AppContext } from "../../AppContext";

export function SettingSidebar() {

    console.log("Setting sidebar rendered");
    const { history, isShowSettingBar } = React.useContext(AppContext);

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
            className='position-fixed d-flex flex-column transition-right-default'
            style={{ right: isShowSettingBar ? "0" : "-360px", width: "360px", height: "calc(100% - 56px)", top: "56px" }}
        >
            <div></div>
            <div className="flex-fill">
                <Input
                />
            </div>
            <div className="d-flex">
                <div className="w-50 text-center">
                    <Button
                        color="danger"
                        outline={true}
                        onClick={() => _handleButtonClick("makeTable")}
                    >
                        Make Table
                    </Button>
                </div>
                <div className="w-50 text-center">
                    <Button
                        color="danger"
                        outline={true}
                        onClick={() => _handleButtonClick("cutTable")}
                    >
                        Cut Table
                    </Button>
                </div>
                <div className="w-50">
                    <Button
                        color="danger text-center"
                        outline={true}
                        onClick={() => _handleButtonClick("history")}
                    >
                        History
                    </Button>
                </div>
            </div>
        </div>
    )
}
