import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

// eslint-disable-next-line import/no-cycle
// import counterReducer from './modules/counter/counter/counterSlice';

import appReducer from './AppReducer';

import { homeReducers } from './modules/home';
import { authReducers } from './modules/auth';
import { kdsReducers } from './modules/kds';
import { orderReducers } from './modules/order';

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        // counter: counterReducer,

        catalogReducer: appReducer,
        ...homeReducers,
        ...authReducers,
        ...kdsReducers,
        ...orderReducers,
    });
}
