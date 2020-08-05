import OrderCreatePage from "./order-create/OrderCreatePage";
import OrderPaymentPage from "./order-payment/OrderPaymentPage";

import orderCreateReducer from "./order-create/OrderCreateReducer";
import orderPaymentReducer from "./order-payment/OrderPaymentReducer";

export const OrderModule = [
    { path: "/orders/new", component: OrderCreatePage, exact: true, isPrivate: false },
    { path: "/orders/:id/payment", component: OrderPaymentPage, exact: true, isPrivate: false },
];

export const orderReducers = {
    orderCreateReducer,
    orderPaymentReducer,
};
