import OrderCreatePage from "./order-create/OrderCreatePage";

import orderCreateReducer from "./order-create/OrderCreateReducer";

export const OrderModule = [
    { path: "/orders/new", component: OrderCreatePage, exact: true, isPrivate: false },
];

export const orderReducers = {
    orderCreateReducer,
};
