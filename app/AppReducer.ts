
const CATALOG__UPDATE_OT_SERVER_IP  = "CATALOG__UPDATE_OT_SERVER_IP";

const CATALOG__NEW_ORDER_CAME       = "CATALOG__NEW_ORDER_CAME";

export const catalog_updateOtServerIP = (otServerIP) => {
    return {
        type: CATALOG__UPDATE_OT_SERVER_IP,
        otServerIP: otServerIP,
    }
}

export const catalog_newOrderCame = (orders) => {
    return {
        type: CATALOG__NEW_ORDER_CAME,
        otSerordersverIP: orders,
    }
}

const initialState = {
    otServerIP: "",
    orders: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CATALOG__UPDATE_OT_SERVER_IP:
            return {
                ...state,
                otServerIP: action.otServerIP,
            }
        case CATALOG__NEW_ORDER_CAME:
            return {
                ...state,
                orders: [ ...state.orders, ...action.orders ],
            }
        default:
            return state;
    }
}
