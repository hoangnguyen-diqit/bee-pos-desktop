import React from "react";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import { Card, CardBody, Button } from "reactstrap";

import { OrderType } from "../../../../enum/OrderType";

import { AppContext } from "../../../../AppContext";

import { OptionDialogFormGroup } from "../../../../core-ui/form-group/OptionDialogFormGroup";

export function RightActionsCard() {

    const { history } = React.useContext(AppContext);
    const [ isShowOptionDlg, setIsShowOptionDlg ] = React.useState(false);
    const [ value, ] = React.useState(false);

    const _handleCreateDeliveryOrderClick = (type) => {
        if (history) {
            history.push(`/orders/new/${type}`);
        }
    };

    const _handleOrderHistoryClick = () => {
        if (history) {
            history.push(`/orders/histories`);
        }
    }

    return (
        <Card>
            <CardBody className="p-0">
                <Button
                    color="danger"
                    block
                    onClick={() => _handleCreateDeliveryOrderClick(OrderType.Delivery)}
                >
                    <Icon path={mdiPlus} size={1} className="mr-3" />
                    <span>Create Delivery Order</span>
                </Button>
                <Button
                    color="danger"
                    block
                    onClick={() => _handleCreateDeliveryOrderClick(OrderType.TakeAway)}
                >
                    <Icon path={mdiPlus} size={1} className="mr-3" />
                    <span>Create TakeAway Order</span>
                </Button>
                <Button
                    color="danger"
                    block
                    onClick={() => _handleCreateDeliveryOrderClick(OrderType.EatIn)}
                >
                    <Icon path={mdiPlus} size={1} className="mr-3" />
                    <span>Create Eat In Order</span>
                </Button>
                <Button
                    color="light"
                    block
                    onClick={() => _handleOrderHistoryClick()}
                >
                    <span>Order History</span>
                </Button>
                <div className="d-flex">
                    <Button
                        color="light"
                        block
                        className="w-50"
                    >
                        <span>Till Out</span>
                    </Button>
                    <Button
                        color="light"
                        block
                        className="w-50"
                        onClick={() => {
                            history.push(`/welcome`)
                        }}
                    >
                        <span>Close Shift</span>
                    </Button>
                </div>
            </CardBody>
            <OptionDialogFormGroup
                isOpen={isShowOptionDlg}
                options={[
                ]}
                value={value}
                validationsI18n={{}}
                toggleOpen={() => setIsShowOptionDlg(!isShowOptionDlg)}
                onChange={(sV) => {
                    if (sV.type === "cancel") {
                        setIsShowOptionDlg(false);
                    } else if (sV.type === "ok") {
                        setIsShowOptionDlg(false);
                    }
                }}
            />
        </Card>
    )
}
