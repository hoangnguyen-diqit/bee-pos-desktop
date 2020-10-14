import OrderCreatePage from "./order-create/OrderCreatePage";
import OrderPaymentPage from "./order-payment/OrderPaymentPage";
import OrderHistoryPage from "./order-history/OrderHistoryPage";

import orderCreateReducer from "./order-create/OrderCreateReducer";
import orderPaymentReducer from "./order-payment/OrderPaymentReducer";
import orderHistoryReducer from "./order-history/OrderHistoryReducer";

export const OrderModule = [
    { path: "/orders/new", component: OrderCreatePage, exact: true, isPrivate: false },
    { path: "/orders/new/:type", component: OrderCreatePage, exact: true, isPrivate: false },
    { path: "/orders/histories", component: OrderHistoryPage, exact: true, isPrivate: false },
    { path: "/orders/:id/payment", component: OrderPaymentPage, exact: true, isPrivate: false },
];

export const orderReducers = {
    orderCreateReducer,
    orderPaymentReducer,
    orderHistoryReducer,
};
