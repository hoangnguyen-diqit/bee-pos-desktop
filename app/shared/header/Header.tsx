import React from "react";
import moment from "moment";
import { Navbar, Nav, Button } from "reactstrap";

import { useInterval } from "../custom-hooks/use-interval";

import logoImage from "../../assets/images/logo.png";

import { AppContext } from "../../AppContext";
// import { InputFormGroup } from "../../core-ui/form-group/InputFormGroup";
import { DropdownFormGroup } from "../../core-ui/form-group/DropdownFormGroup";

const orderTypes = [
    { label: "All Orders", value: "all" },
    { label: "Delivery Orders", value: "delivery" },
    { label: "Takeaway Orders", value: "takeAway" },
];

const fieldsReducer = (state, action) => {
    return {
        ...state,
        ...action,
    }
}

type Props = {
    actionComponent?: React.ReactNode,
};

const initialState = {
    fields: {
        orderType: "all",
    }
}

export function Header({
    actionComponent,
}: Props) {

    const {
        history,
        isShowSettingBar,
        isFilterPizzaPremake,
        toggleSettingBar,
        toggleFilterPizzaPremake,
    } = React.useContext(AppContext);
    const [ currentTime, setCurrentTime ] = React.useState(new Date());
    const [ fields, dispatchFields ] = React.useReducer(fieldsReducer, initialState.fields);

    const _handleHomeClick = () => {
        if (history) {
            history.push(`/home`);
        }
    }

    const _handleButtonFilterPizzaPremakeClick = () => {
        toggleFilterPizzaPremake(!isFilterPizzaPremake);
    }

    const _handleButtonSettingsClick = () => {
        toggleSettingBar(!isShowSettingBar);
    }

    const _handleInputChange = (field, value) => {
        dispatchFields({ [field]: value });
    }

    useInterval(() => {
        setCurrentTime(new Date());
    }, 1 * 60 * 1000);

    // React.useEffect(() => {

    // }, [currentTime]);

    return (
        <Navbar
            className="default-bg text-white position-fixed"
            style={{ height: "56px", top: 0, left: 0, right: 0, zIndex: 2 }}
        >
            <Nav
                className="align-items-center"
                style={{ width: "500px" }}
            >
                <div className="mr-auto">
                    <Button
                        color="light"
                        className="p-0"
                        onClick={() => _handleHomeClick()}
                    >
                        <img
                            src={logoImage}
                        />
                    </Button>
                </div>
                <div className="d-flex align-items-center">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-calendar mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1zm1-3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z"/>
                        <path fillRule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z"/>
                    </svg>
                    <span>{moment(currentTime).format("dddd D[,] HH:mm A")}</span>
                </div>
            </Nav>
            <div className="flex-fill text-center">
                0 Orders
            </div>
            <Nav
                className="align-items-center"
                style={{ width: "500px" }}
            >
                {actionComponent}
                <DropdownFormGroup
                    className="mr-auto mb-0"
                    style={{ width: "160px"}}
                    label=""
                    options={orderTypes
                        .map(item => ({ label: item.label, value: item.value })) || []
                    }
                    value={fields.orderType}
                    isClearable={false}
                    onChange={(s0 => _handleInputChange("orderType", s0))}
                />
                {/* <CustomInputFormGroup
                    type="select"
                    className="mr-auto mb-0"
                    id="header__filter-order__input"
                >
                    {(Array.isArray(orderTypes) && orderTypes.length > 0) &&
                        orderTypes
                            .map((item, index) => {
                                return (
                                    <option key={index} className="py-3">{item.label}</option>
                                )
                            })
                    }
                </CustomInputFormGroup> */}
                <Button
                    color="danger"
                    outline
                    active={isFilterPizzaPremake}
                    onClick={_handleButtonFilterPizzaPremakeClick}
                >
                    Filter Pizza Premake
                </Button>
                <Button
                    color="danger"
                    outline
                    onClick={_handleButtonSettingsClick}
                >
                    Settings
                </Button>
            </Nav>
        </Navbar>
    )
}
