 import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";

const options = [
    { label: "Option 1" },
];

export function UserSettingDropdown() {

    const [ isOpen, setIsOpen ] = React.useState(false);

    return (
        <Dropdown
            isOpen={isOpen}
            toggle={() => setIsOpen(!isOpen)}
        >
            <DropdownToggle
                className="p-0"
            >
                <img
                    src=""
                    className="rounded-circle overflow-hidden"
                    style={{ width: "32px", height: "32px" }}
                />
            </DropdownToggle>
            <DropdownMenu>
                {(Array.isArray(options) && options.length > 0) &&
                    options
                        .map((item, index) => {
                            return (
                                <DropdownItem
                                    key={index}
                                >
                                    {item.label}
                                </DropdownItem>
                            )
                        })
                }
            </DropdownMenu>
        </Dropdown>
    )
}
