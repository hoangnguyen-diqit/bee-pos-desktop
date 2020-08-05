import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import { AppContext } from '../../../AppContext';

import { Header } from '../../../shared/header/Header';
import { PageInner } from '../../../shared/page-inner/PageInner';

import { OrderDetailsCard } from './children/OrderDetailsCard';
import { PaymentDetailsCard } from './children/PaymentDetailsCard';
import { RightActionsCard } from './children/RightActionsCard';

export default function OrderCreatePage() {

    const { history } = React.useContext(AppContext);

    const _handlePayClick = () => {
        if (history) {
            history.push(`/orders/123/payment`);
        }
    }

    return (
        <>
            <Header
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
                                    outline
                                    className="w-50"
                                >
                                    Void
                                </Button>
                                <Button
                                    color="danger"
                                    className="w-50"
                                    onClick={() => _handlePayClick()}
                                >
                                    Pay
                                </Button>
                            </div>
                        </Col>
                        <Col xs="6">
                            <RightActionsCard
                            />
                        </Col>
                    </Row>
                </Container>
            </PageInner>
        </>
    )
}
