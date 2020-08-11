 import React from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { Link } from "react-router-dom";

const options = [
    { label: "Option 1", link: "/option-1" },
    { label: "Option 2", onClickName: "option2" },
    { label: "Divider", type: "divider" },
    { label: "Signout", link: "/logout" },
];

export function UserSettingDropdown() {

    const [ isOpen, setIsOpen ] = React.useState(false);

    const _renderItem = (item, index) => {
        if (item && item.type === "divider") {
            return (
                <DropdownItem divider key={index}/>
            )
        } else {
            if (item.link) {
                return (<Link to={item.link} key={index} className="dropdown-item">{item.label}</Link>)
            } else {
                return (
                    <DropdownItem
                        key={index}
                    >
                        {item.label}
                    </DropdownItem>
                )
            }
        }
    }

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
                    .map((item, index) => _renderItem(item, index))
                }
            </DropdownMenu>
        </Dropdown>
    )
}
