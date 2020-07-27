import React from "react";
import ReactToPrint from "react-to-print";
import { Button, Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { orderdb } from "../../../core/nedb";

import { kdsMakeTable_findManyOrdersSuccess } from "./KdsMakeTableReducer";

import { Header } from "../../../shared/header/Header";
import { SettingSidebar } from "../../../shared/setting-sidebar/SettingSidebar";
import { OrderCard } from "../../../shared/order-card/OrderCard";

import { ComponentToPrint } from "./ComponentToPrint";

function KdsMakeTablePage(props) {

    console.log(props);

    const orders = useSelector<any, any>(state => state.kdsMakeTableReducer.orders);
    const dispatch = useDispatch();

    let _componentRef = React.createRef<ComponentToPrint>();

    const _handleButtonAddOrderClick = () => {
        orderdb.insert([{
            title: "Order 1",
        }], (err, newDocs) => {
            if (err) {
                console.log(err);
            }

            console.log(newDocs)
            dispatch(kdsMakeTable_findManyOrdersSuccess([ ...orders, ...newDocs ]));
        })
    }

    React.useEffect(() => {
        orderdb.find({}, (err, docs) => {
            if (err) {
                console.log(err);
            }

            dispatch(kdsMakeTable_findManyOrdersSuccess(docs));

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
                <Container fluid>
                    <Row>
                    {(Array.isArray(orders) && orders.length > 0) &&
                        orders
                            .map((item, index) => {
                                return (
                                    <Col key={index} xs="12" lg={3}>
                                        <OrderCard
                                            item={item}
                                            currentPage="makeTable"
                                            className="mb-3"
                                        />
                                    </Col>
                                )
                            })
                    }
                    </Row>
                </Container>
                <div>
                    <Button
                        onClick={_handleButtonAddOrderClick}
                    >
                        Add Order
                    </Button>
                </div>
                <div>
                <ReactToPrint
                    trigger={() => <a href="#">Print this out!</a>}
                    content={() => _componentRef.current}
                />
                <ComponentToPrint ref={_componentRef} />
                </div>
            </div>
            <SettingSidebar
                currentPage="makeTable"
            />
        </div>
    )
}

export default KdsMakeTablePage;
