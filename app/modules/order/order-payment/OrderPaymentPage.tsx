import React from "react";
import { Container, Row, Col } from "reactstrap";

import { Header } from "../../../shared/header/Header";
import { PageInner } from "../../../shared/page-inner/PageInner";
import { PaymentMethodsCard } from "../../../shared/payment-methods-card/PaymentMethodsCard";

import { PaymentDetailsCard } from "./children/PaymentDetailsCard";

export default function OrderPaymentPage() {

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
                            />
                        </Col>
                    </Row>
                </Container>
            </PageInner>
        </>
    )
}
