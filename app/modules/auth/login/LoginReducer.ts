
const HOME__FIND_MANY_SUCCESS = "HOME__FIND_MANY_SUCCESS";

export const kdsMakeTable_findManyOrdersSuccess = (orders) => {
    return {
        type: HOME__FIND_MANY_SUCCESS,
        orders: orders,
    }
}

const initialState = {
    orders: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case HOME__FIND_MANY_SUCCESS:
            return {
                ...state,
                orders: action.orders,
            }
        default:
            return state;
    }
}
