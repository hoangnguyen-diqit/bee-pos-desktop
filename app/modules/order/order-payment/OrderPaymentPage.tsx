import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

import { Header } from "../../../shared/header/Header";
import { PageInner } from "../../../shared/page-inner/PageInner";
import { PaymentMethodsCard } from "../../../shared/payment-methods-card/PaymentMethodsCard";

import { PaymentDetailsCard } from "./children/PaymentDetailsCard";

export default function OrderPaymentPage() {

    const _handleDoneClick = () => {

    };

    return (
        <>
            <Header
            />
            <PageInner>
                <Container fluid>
                    <Row>
                        <Col xs="6">
                            <h3>Order Name</h3>
                            <PaymentDetailsCard
                            />
                        </Col>
                        <Col xs="6">
                            <PaymentMethodsCard
                                options={[
                                    { label: "Cash", value: "cash" },
                                    { label: "BCA", value: "bca" },
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
                        </Col>
                    </Row>
                </Container>
            </PageInner>
        </>
    )
}
