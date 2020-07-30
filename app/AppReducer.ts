
const CATALOG__UPDATE_OT_SERVER_IP      = "CATALOG__UPDATE_OT_SERVER_IP";

const CATALOG__NEW_ORDER_CAME           = "CATALOG__NEW_ORDER_CAME";

const CATALOG__UPDATE_DEFAULT_PRINTER   = "CATALOG__UPDATE_DEFAULT_PRINTER";

export const catalog_updateOtServerIP = (otServerIP) => {
    return {
        type: CATALOG__UPDATE_OT_SERVER_IP,
        otServerIP: otServerIP,
        defaultPrinter: "",
    }
}

export const catalog_newOrderCame = (orders) => {
    return {
        type: CATALOG__NEW_ORDER_CAME,
        otSerordersverIP: orders,
    }
}

export const catalog_updateDefaultPrinter = (printerName) => {
    return {
        type: CATALOG__UPDATE_DEFAULT_PRINTER,
        defaultPrinter: printerName,
    }
}

const initialState = {
    otServerIP: "",
    orders: [],
    defaultPrinter: "",
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
        case CATALOG__UPDATE_DEFAULT_PRINTER:
            return {
                ...state,
                defaultPrinter: action.defaultPrinter,
            }
        default:
            return state;
    }
}
