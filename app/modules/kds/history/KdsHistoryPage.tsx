import React from "react";
import { Button, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { orderdb } from "../../../core/nedb";

import { kdsHistory_findManyOrdersSuccess } from "./KdsHistoryReducer";

import { Header } from "../../../shared/header/Header";
import { SettingSidebar } from "../../../shared/setting-sidebar/SettingSidebar";
import { OrderCard } from "../../../shared/order-card/OrderCard";

function KdsHistoryPage() {

    const orders = useSelector<any, any>(state => state.kdsMakeTableReducer.orders);
    const dispatch = useDispatch();

    const _handleButtonAddOrderClick = () => {
        orderdb.insert([{
            title: "Order 1",
        }], (err, newDocs) => {
            if (err) {
                console.log(err);
            }

            console.log(newDocs)
            dispatch(kdsHistory_findManyOrdersSuccess([ ...orders, ...newDocs ]));
        })
    }

    React.useEffect(() => {
        orderdb.find({}, (err, docs) => {
            if (err) {
                console.log(err);
            }

            dispatch(kdsHistory_findManyOrdersSuccess(docs));

            if (Array.isArray(docs) && docs.length > 0) {
                console.log(docs);
            }
            if (!Array.isArray(docs) || docs.length === 0) {
                console.log("No Order");
            }
        })
    }, [ JSON.stringify(orders) ]);

    return (
        <div>
            <Header
            />
            <div>
                Make Table
                <Button
                    onClick={_handleButtonAddOrderClick}
                >
                    Add Order
                </Button>
                <Container fluid>
                    <Row>
                    {(Array.isArray(orders) && orders.length > 0) &&
                        orders
                            .map((item, index) => {
                                return (
                                    <Col key={index} xs="12" lg={3}>
                                        <OrderCard
                                            item={item}
                                            currentPage="kdsHistory"
                                        />
                                    </Col>
                                )
                            })
                    }
                    </Row>
                </Container>
            </div>
            <SettingSidebar
                currentPage="kdsHistory"
            />
        </div>
    )
}

export default KdsHistoryPage;
