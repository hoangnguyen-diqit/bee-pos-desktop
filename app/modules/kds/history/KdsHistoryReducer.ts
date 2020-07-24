
const KDS_HISTORY__FIND_MANY_SUCCESS = "KDS_HISTORY__FIND_MANY_SUCCESS";

export const kdsHistory_findManyOrdersSuccess = (orders) => {
    return {
        type: KDS_HISTORY__FIND_MANY_SUCCESS,
        orders: orders,
    }
}

const initialState = {
    orders: [],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case KDS_HISTORY__FIND_MANY_SUCCESS:
            return {
                ...state,
                orders: action.orders,
            }
        default:
            return state;
    }
}
