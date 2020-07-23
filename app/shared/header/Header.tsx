import React from "react";
import { Navbar, Nav, Button } from "reactstrap";

import { AppContext } from "../../AppContext";

export function Header() {

    const { isShowSettingBar, toggleSettingBar } = React.useContext(AppContext);

    const _handleButtonSettingsClick = () => {
        toggleSettingBar(!isShowSettingBar);
    }

    return (
        <Navbar
            className="bg-dark text-white"
        >
            <Nav>
            </Nav>
            <div className="mr-auto">
            </div>
            <Nav>
                <Button
                    onClick={_handleButtonSettingsClick}
                >
                    Settings
                </Button>
            </Nav>
        </Navbar>
    )
}
