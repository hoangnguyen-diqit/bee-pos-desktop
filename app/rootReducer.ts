import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

// eslint-disable-next-line import/no-cycle
import counterReducer from './modules/counter/counter/counterSlice';

import { kdsReducers } from './modules/kds';

export default function createRootReducer(history: History) {
    return combineReducers({
        router: connectRouter(history),
        counter: counterReducer,

        ...kdsReducers,
    });
}
