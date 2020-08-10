import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { ipcRenderer } from 'electron';

import { createUuidv4 } from '../../../utils/UuidUtils';

import { AppContext } from '../../../AppContext';

import { Header } from '../../../shared/header/Header';
import { PageInner } from '../../../shared/page-inner/PageInner';
import { PaymentMethodsCard } from '../../../shared/payment-methods-card/PaymentMethodsCard';

import { OrderDetailsCard } from './children/OrderDetailsCard';
import { PaymentDetailsCard } from './children/PaymentDetailsCard';
import { RightActionsCard } from './children/RightActionsCard';
import { FillCustomerInfoCard } from './children/FillCustomerInfoCard';

const PAGE_MODES = {
    SELECT_ITEM: "selectItem",
    FILL_CUSTOMER_INFO: "fillCustomerInfo",
    PAYMENT: "payment",
}

export default function OrderCreatePage({ match }) {

    const type = match.params.type;
    const { history } = React.useContext(AppContext);
    const [ pageMode, setPageMode ] = React.useState(PAGE_MODES.SELECT_ITEM);

    const _handlePayClick = () => {
        setPageMode(PAGE_MODES.PAYMENT);
    }

    const _handleDoneClick = () => {
        ipcRenderer.send("sendToClient", [
            {
                actionType: "order_insert",
                param: {
                    _id: createUuidv4(),
                    type: type,
                    name: "ABC",
                    phone: "9923242455",
                },
                table: "order",
            },
        ])
    };

    return (
        <>
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
                        <Col xs="6">
                            <h3>Order Name</h3>
                            <OrderDetailsCard
                            />
                            <PaymentDetailsCard
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
                                <RightActionsCard
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
        </>
    )
}
