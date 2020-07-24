
const KDS_MAKE_TABLE__FIND_MANY_SUCCESS = "KDS_MAKE_TABLE__FIND_MANY_SUCCESS";

export const kdsMakeTable_findManyOrdersSuccess = (orders) => {
    return {
        type: KDS_MAKE_TABLE__FIND_MANY_SUCCESS,
        orders: orders,
    }
}

const initialState = {
    orders: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case KDS_MAKE_TABLE__FIND_MANY_SUCCESS:
            return {
                ...state,
                orders: action.orders,
            }
        default:
            return state;
    }
}
