import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { ipcRenderer } from 'electron';

// import { orderdb } from "../../../core/nedb";

import { kdsMakeTable_findManyOrdersSuccess } from "./KdsMakeTableReducer";

import { Header } from "../../../shared/header/Header";
import { SettingSidebar } from "../../../shared/setting-sidebar/SettingSidebar";
import { OrderCard } from "../../../shared/order-card/OrderCard";

import { ComponentToPrint } from "./ComponentToPrint";
import { PageInner } from "../../../shared/page-inner/PageInner";

function KdsMakeTablePage(props) {

    console.log(props);

    const orders = useSelector<any, any>(state => state.kdsMakeTableReducer.orders);
    const dispatch = useDispatch();

    let _componentRef = React.createRef<ComponentToPrint>();

    const _handleButtonAddOrderClick = () => {
        // orderdb.insert([{
        //     title: "Order 1",
        // }], (err, newDocs) => {
        //     if (err) {
        //         console.log(err);
        //     }

        //     console.log(newDocs)
        //     dispatch(kdsMakeTable_findManyOrdersSuccess([ ...orders, ...newDocs ]));
        // })
    }

    const _listPrintersClick = () => {
        ipcRenderer.on("getPrintersResp", (event, args) => {
            console.log(event);
            console.log(args);
        })
        ipcRenderer.send("getPrinters", "something");
    }

    const _handlePrintClick = () => {
        ipcRenderer.send("printFile", "something");
    }

    React.useEffect(() => {
        ipcRenderer.on("getOrdersResp", (err, args) => {
            if (err) {
                console.log(err);
            }

            dispatch(kdsMakeTable_findManyOrdersSuccess(args.orders));

            if (Array.isArray(args.orders) && args.orders.length > 0) {
                console.log(args.orders);
            }
            if (!Array.isArray(args.orders) || args.orders.length === 0) {
                console.log("No Order");
            }
        })
        ipcRenderer.send("getOrders", {});
        // orderdb.find({}, (err, docs) => {
        //     if (err) {
        //         console.log(err);
        //     }

        //     dispatch(kdsMakeTable_findManyOrdersSuccess(docs));

        //     if (Array.isArray(docs) && docs.length > 0) {
        //         console.log(docs);
        //     }
        //     if (!Array.isArray(docs) || docs.length === 0) {
        //         console.log("No Order");
        //     }
        // })
    }, [ JSON.stringify(orders) ]);

    return (
        <div>
            <Header
            />
            <PageInner>
                <Container fluid>
                    <Row>
                    {(Array.isArray(orders) && orders.length > 0) &&
                        orders
                            .map((item, index) => {
                                return (
                                    <Col key={item.id || index} xs="12" lg={3}>
                                        <OrderCard
                                            key={item.id || index}
                                            item={item}
                                            currentPage="makeTable"
                                            className="mb-3"
                                        />
                                    </Col>
                                )
                            })
                    }
                    </Row>
                    <Row>
                    {(!Array.isArray(orders) || orders.length === 0) &&
                        <p>No Order</p>
                    }
                    </Row>
                </Container>
            </PageInner>
            <SettingSidebar
                currentPage="makeTable"
            />
        </div>
    )
}

export default KdsMakeTablePage;
