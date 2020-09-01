import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";

import { Header } from "../../../shared/header/Header";
import { SettingSidebar } from "../../../shared/setting-sidebar/SettingSidebar";
import { OrderCard } from "../../../shared/order-card/OrderCard";
import { PageInner } from "../../../shared/page-inner/PageInner";

function KdsHistoryPage() {

    const orders = useSelector<any, any>(state => state.kdsMakeTableReducer.orders);

    React.useEffect(() => {

    }, [ JSON.stringify(orders) ]);

    const _renderOrderItem = (item, index) => {
        return (
            <Col key={index} xs="12" lg={3}>
                <OrderCard
                    item={item}
                    currentPage="kdsHistory"
                />
            </Col>
        )
    }

    return (
        <div>
            <Header
            />
            <PageInner>
                <Container fluid>
                    <Row>
                        {(Array.isArray(orders) && orders.length > 0) &&
                            orders
                            .map((item, index) => _renderOrderItem(item, index))
                        }
                    </Row>
                </Container>
            </PageInner>
            <SettingSidebar
                currentPage="kdsHistory"
            />
        </div>
    )
}

export default KdsHistoryPage;
