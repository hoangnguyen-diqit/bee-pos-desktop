
const KDS_CUT_TABLE__FIND_MANY_SUCCESS = "KDS_CUT_TABLE__FIND_MANY_SUCCESS";

export const kdsCutTable_findManyOrdersSuccess = (orders) => {
    return {
        type: KDS_CUT_TABLE__FIND_MANY_SUCCESS,
        orders: orders,
    }
}

const initialState = {
    orders: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case KDS_CUT_TABLE__FIND_MANY_SUCCESS:
            return {
                ...state,
                orders: action.orders,
            }
        default:
            return state;
    }
}
