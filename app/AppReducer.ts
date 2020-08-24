
const CATALOG__UPDATE_OT_SERVER_IP          = "CATALOG__UPDATE_OT_SERVER_IP";

const CATALOG__NEW_ORDER_CAME               = "CATALOG__NEW_ORDER_CAME";

const CATALOG__UPDATE_DEFAULT_PRINTER       = "CATALOG__UPDATE_DEFAULT_PRINTER";

const CATALOG__FIND_MANY_CATEGORIES_SUCCESS = "CATALOG__FIND_MANY_CATEGORIES_SUCCESS";
const CATALOG__FIND_MANY_CATEGORIES_FAILURE = "CATALOG__FIND_MANY_CATEGORIES_FAILURE";

const CATALOG__FIND_MANY_PRODUCTS_SUCCESS   = "CATALOG__FIND_MANY_PRODUCTS_SUCCESS";
const CATALOG__FIND_MANY_PRODUCTS_FAILURE   = "CATALOG__FIND_MANY_PRODUCTS_FAILURE";

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
        orders: orders,
    }
}

export const catalog_updateDefaultPrinter = (printerName) => {
    return {
        type: CATALOG__UPDATE_DEFAULT_PRINTER,
        defaultPrinter: printerName,
    }
}

export const catalog_findManyCategoriesSuccess = (categories) => {
    return {
        type: CATALOG__FIND_MANY_CATEGORIES_SUCCESS,
        categories: categories,
    }
}

export const catalog_findManyCategoriesFailure = () => {
    return {
        type: CATALOG__FIND_MANY_CATEGORIES_FAILURE,
    }
}

export const catalog_findManyProductsSuccess = (products) => {
    return {
        type: CATALOG__FIND_MANY_PRODUCTS_SUCCESS,
        products: products,
    }
}

export const catalog_findManyProductsFailure = () => {
    return {
        type: CATALOG__FIND_MANY_PRODUCTS_FAILURE,
    }
}

type ICatalogReducer = {
    otServerIP: string,
    orders: any[],
    defaultPrinter: string,

    categories: any[],
    products: any[],
}

const initialState: ICatalogReducer = {
    otServerIP: "",
    orders: [],
    defaultPrinter: "",

    categories: [],
    products: [],
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
        case CATALOG__FIND_MANY_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.categories,
            }
        case CATALOG__FIND_MANY_CATEGORIES_FAILURE:
            return {
                ...state,
                categories: [],
            }
        case CATALOG__FIND_MANY_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.products,
            }
        case CATALOG__FIND_MANY_PRODUCTS_FAILURE:
            return {
                ...state,
                products: [],
            }
        default:
            return state;
    }
}
