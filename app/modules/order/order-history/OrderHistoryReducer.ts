const ORDER_HISTORY__FIND_MANY_ORDERS_SUCCESS = "ORDER_HISTORY__FIND_MANY_ORDERS_SUCCESS";
const ORDER_HISTORY__FIND_MANY_ORDERS_FAILURE = "ORDER_HISTORY__FIND_MANY_ORDERS_FAILURE";

export function orderHistory_findManyOrdersSuccess(orders) {
    return {
        type: ORDER_HISTORY__FIND_MANY_ORDERS_SUCCESS,
        orders: orders,
    }
}

export function orderHistory_findManyOrdersFailure() {
    return {
        type: ORDER_HISTORY__FIND_MANY_ORDERS_FAILURE,
    }
}

const initialState = {
    orders: [],
}

export default function(state = initialState, action) {
    switch (action.type) {
        case ORDER_HISTORY__FIND_MANY_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
            }
        case ORDER_HISTORY__FIND_MANY_ORDERS_FAILURE:
            return {
                ...state,
                orders: [],
            }
        default:
            return state;
    }
}
