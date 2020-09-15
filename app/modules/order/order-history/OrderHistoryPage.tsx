import React, { Fragment, useState, useEffect } from "react";
import log from 'electron-log';
import { Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { ipcRenderer } from "electron";

import { RootState } from "../../../store";

import {
    orderHistory_findManyOrdersSuccess,
    orderHistory_findManyOrdersFailure,
} from "./OrderHistoryReducer";

import { Header } from "../../../shared/header/Header";
import { PageInner } from "../../../shared/page-inner/PageInner";
import { RightnavDialog } from "../../../shared/rightnav/RightnavDialog";
import { InfiniteScroll } from "../../../shared/infinite-scroller/InfiniteScroller";

export default function OrderHistoryPage({
}) {

    const [ page, setPage ] = useState(0);
    const [ isOpenRightnavDialog, setIsOpenRightnavDialog ] = useState(false);

    const orders = useSelector<RootState, any>(state => state.orderHistoryReducer.orders);
    const dispatch = useDispatch();

    const _handleClickClick = () => {
        setIsOpenRightnavDialog(true);
    };

    const _handleLoadMore = (page) => {
        setPage(page);
    }

    useEffect(() => {
        ipcRenderer.once("getOrdersResp", (ev, args) => {
            log.info("Find many orders success: " + (args.orders || []).length);
            dispatch(orderHistory_findManyOrdersSuccess(args.orders || []));
        })
        ipcRenderer.once("getOrdersError", (ev, args) => {
            dispatch(orderHistory_findManyOrdersFailure());
        })
        ipcRenderer.send('message', {
            type: "getOrders",
            page: page,
            filterMap: {
            },
        })
    }, [ page ])

    return (
        <Fragment>
            <Header
                actionComponent={
                    <Fragment>
                        <Button
                            onClick={() => _handleClickClick()}
                        >
                            Click
                        </Button>
                    </Fragment>
                }
            />
            <PageInner>
                <div className="viewport-full">
                    <InfiniteScroll
                        loadMore={_handleLoadMore}
                    >
                        {(Array.isArray(orders) && orders.length > 0) &&
                            orders
                            .map((item, index) => {
                                return (
                                    <div key={index}>
                                        {"Item"}
                                    </div>
                                )
                            })
                        }
                    </InfiniteScroll>
                </div>
            </PageInner>
            <RightnavDialog
                isOpen={isOpenRightnavDialog}
                toggleOpen={() => setIsOpenRightnavDialog(!isOpenRightnavDialog)}
                value={{}}
                onChange={() => {

                }}
            />
        </Fragment>
    )
}
