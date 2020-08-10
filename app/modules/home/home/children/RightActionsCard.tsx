import React from "react";
import PlusIcon from "mdi-react/PlusIcon";
import { Card, CardBody, Button } from "reactstrap";
import { ipcRenderer } from "electron";

import { AppContext } from "../../../../AppContext";

import { OptionDialogFormGroup } from "../../../../core-ui/form-group/OptionDialogFormGroup";

export function RightActionsCard() {

    const { history } = React.useContext(AppContext);
    const [ isShowOptionDlg, setIsShowOptionDlg ] = React.useState(false);
    const [ value, setValue ] = React.useState(false);

    const _handleCreateDeliveryOrderClick = (type) => {
        if (history) {
            history.push(`/orders/new/${type}`);
        }
    };

    const _handleSendToClientClick = () => {
        ipcRenderer.send("sendToClient", [
            {
                actionType: "order_insert",
                param: {
                    _id: "12345",
                    name: "ABC"
                },
                table: "order",
            },
        ])
    }

    return (
        <Card>
            <CardBody className="p-0">
                <Button
                    color="danger"
                    block
                    onClick={() => _handleCreateDeliveryOrderClick("delivery")}
                >
                    <PlusIcon className="mr-3" />
                    <span>Create Delivery Order</span>
                </Button>
                <Button
                    color="danger"
                    block
                    onClick={() => _handleCreateDeliveryOrderClick("takeAway")}
                >
                    <PlusIcon className="mr-3" />
                    <span>Create TakeAway Order</span>
                </Button>
                <Button
                    color="danger"
                    block
                    onClick={() => _handleCreateDeliveryOrderClick("eatIn")}
                >
                    <PlusIcon className="mr-3" />
                    <span>Create Eat In Order</span>
                </Button>
                <Button
                    color="light"
                    block
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
                    >
                        <span>Close Shift</span>
                    </Button>
                </div>
                <Button
                    onClick={_handleSendToClientClick}
                >
                    Send to Client
                </Button>
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
