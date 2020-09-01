import React, { Fragment } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { useSelector } from 'react-redux';
import { ipcRenderer } from 'electron';

import { createUuidv4 } from '../../../utils/UuidUtils';
import { PropsFromRouter } from '../../../utils/AppUtils';
import { formatDate } from '../../../utils/DateTimeUtils';
import { DbTransactionType } from '../../../enum/SocketActionType';
import { DbTableType } from '../../../enum/DbTableType';
import { OrderStatusType } from '../../../enum/OrderType';

import { Header } from '../../../shared/header/Header';
import { PageInner } from '../../../shared/page-inner/PageInner';
import { PaymentMethodsCard } from '../../../shared/payment-methods-card/PaymentMethodsCard';

import { OrderDetailsCard } from './children/OrderDetailsCard';
import { PaymentDetailsCard } from './children/PaymentDetailsCard';
import { FillOrderItemsCard } from './children/FillOrderItemsCard';
import { FillCustomerInfoCard } from './children/FillCustomerInfoCard';
import { OrderDetailsItem } from './children/OrderDetailsItem';

const PAGE_MODES = {
    SELECT_ITEM: "selectItem",
    FILL_CUSTOMER_INFO: "fillCustomerInfo",
    PAYMENT: "payment",
}

const fieldsReducer = (action, state) => {
    return {
        ...action,
        ...state,
    }
}

type Props = PropsFromRouter & {

};

const inititalState = {
    fields: {
        orderItems: [],
    },
}

export default function OrderCreatePage({
    match,
}: Props) {

    const type = match.params.type;
    const [ pageMode, setPageMode ] = React.useState(PAGE_MODES.SELECT_ITEM);
    const [ fields, dispatchFields ] = React.useReducer(fieldsReducer, inititalState.fields);

    const categories = useSelector<any, any>(state => state.catalogReducer.categories);

    const _handlePayClick = () => {
        setPageMode(PAGE_MODES.PAYMENT);
    }

    const _handleInputChange = (field, value) => {
        dispatchFields({ [field]: value });
    }

    const _handlePartialOrderItemChange = (orderItemId, field, value) => {
        const orderItems = [...(fields.orderItems || [])];
        const changedOrderItemIndex = orderItems
            .findIndex(item => item.uuid === orderItemId);

        if (changedOrderItemIndex > -1) {
            const changedOrderItem = fields.orderItems[changedOrderItemIndex];
            orderItems.splice(changedOrderItemIndex, 1, {
                ...changedOrderItem,
                [field]: value,
            })

            dispatchFields({ orderItems: orderItems });
        }
    }

    const _handleDoneClick = () => {
        console.log("Send to client");
        const data: any[] = [];

        const order = {
            uuid: createUuidv4(),
            type: type,
            name: "ABC",
            phone: "9923242455",
            created_at: formatDate(),
            order_type_code: type,
            order_status_code: OrderStatusType.Ordered,
            orderdetails: [],
        };

        let orderItems = [];
        if (Array.isArray(fields.orderItems) && fields.orderItems.length > 0) {
            orderItems = fields.orderItems
                .map((item) => {
                    return {
                        ...item,
                        created_at: formatDate(),
                    }
                })
        }

        if (Array.isArray(orderItems) && orderItems.length > 0) {
            Array.prototype.push.apply(data, orderItems
                .map((item) => {
                    return {
                        actionType: DbTransactionType.Insert,
                        param: item,
                        tableName: DbTableType.OrderItem,
                    }
                }));
        }

        order.orderdetails = orderItems || [];
        data.push({
            actionType: DbTransactionType.Insert,
            param: order,
            tableName: DbTableType.Order,
        });

        ipcRenderer.once("insertOrdersResp", () => {
            ipcRenderer.send("sendToClient", {
                actionType: "order_insert",
                data: data,
            })
        })
        ipcRenderer.send("insertOrders", {
            orders: [order],
        })
    };

    console.log("Order create render 0: " + JSON.stringify(categories));
    return (
        <Fragment>
            <Header
                actionComponent={
                    <div>
                        <Button
                            size="sm"
                            onClick={() => setPageMode(pageMode === PAGE_MODES.SELECT_ITEM ? PAGE_MODES.FILL_CUSTOMER_INFO : (
                                pageMode === PAGE_MODES.FILL_CUSTOMER_INFO ? PAGE_MODES.SELECT_ITEM : PAGE_MODES.SELECT_ITEM)
                            )}
                        >
                            {pageMode === PAGE_MODES.SELECT_ITEM ? "Customer Details" :
                                (pageMode === PAGE_MODES.FILL_CUSTOMER_INFO ? "Menu" : "")
                            }
                        </Button>
                    </div>
                }
            />
            <PageInner>
                <Container fluid>
                    <Row>
                        <Col
                            xs="6"
                            style={{ height: "calc(100vh - 56px - 32px)"}}
                            className="d-flex flex-column"
                        >
                            <OrderDetailsCard
                            >
                                <Fragment>
                                    {(Array.isArray(fields.orderItems) && fields.orderItems.length > 0) &&
                                        fields.orderItems
                                        .map((item, index) => {
                                            return (
                                                <OrderDetailsItem
                                                    key={index}
                                                    className="mb-3"
                                                    item={item}
                                                    onChange={(value) => _handlePartialOrderItemChange(item.uuid, "quantity", value)}
                                                />
                                            )
                                        })
                                    }
                                    {(!Array.isArray(fields.orderItems) || fields.orderItems.length === 0) &&
                                        <p>No Item</p>
                                    }
                                </Fragment>
                            </OrderDetailsCard>
                            <PaymentDetailsCard
                                className="flex-fill"
                            />
                            <div className="d-flex">
                                <Button
                                    color="danger"
                                    size="sm"
                                    outline
                                    className="w-50"
                                >
                                    Void
                                </Button>
                                <Button
                                    color="danger"
                                    size="sm"
                                    className="w-50"
                                    onClick={() => _handlePayClick()}
                                >
                                    Pay
                                </Button>
                            </div>
                        </Col>
                        <Col xs="6">
                            {pageMode === PAGE_MODES.SELECT_ITEM &&
                                <FillOrderItemsCard
                                    options={categories}
                                    selectedOrderItems={fields.orderItems}
                                    onChange={(data) => _handleInputChange("orderItems", data)}
                                />
                            }
                            {pageMode === PAGE_MODES.FILL_CUSTOMER_INFO &&
                                <FillCustomerInfoCard
                                />
                            }
                            {pageMode === PAGE_MODES.PAYMENT &&
                                <React.Fragment>
                                    <PaymentMethodsCard
                                        options={[
                                            { label: "Cash", value: "cash" },
                                            { label: "BCA", value: "bca" },
                                            { label: "BNI", value: "bni" },
                                            { label: "Mandiri", value: "mandiri" },
                                            { label: "Other", value: "other" },
                                        ]}
                                        className="mb-3"
                                    />
                                    <div className="d-flex">
                                        <div className="w-50 pr-2">
                                            <Button
                                                color="danger"
                                                outline
                                                block
                                                className=""
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                        <div className="w-50 pl-2">
                                            <Button
                                                color="danger"
                                                block
                                                className=""
                                                onClick={() => _handleDoneClick()}
                                            >
                                                Done
                                            </Button>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </Col>
                    </Row>
                </Container>
            </PageInner>
        </Fragment>
    )
}
