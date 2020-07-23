import React, { ReactNode } from 'react'
import { History } from 'history';

import { AppContext } from '../AppContext';

import { WebSocketListener } from './websocket/WebSocketListener';

const contextValueReducer = (state, action) => {
    return {
        ...state,
        ...action,
    }
}

type Props = {
    history: History,
    children: ReactNode;
};

export default function App(props: Props) {
    const { children } = props;
    const [ contextValue, dispatchContextValue ] = React.useReducer(contextValueReducer, {
        isShowSettingBar: false,
        isFilterPizzaPremake: false,
    });

    return (
        <AppContext.Provider
            value={{
                history: props.history,
                isShowSettingBar: contextValue.isShowSettingBar,
                isFilterPizzaPremake: contextValue.isFilterPizzaPremake,

                toggleSettingBar: (state) => dispatchContextValue({ isShowSettingBar: state }),
                toggleFilterPizzaPremake: (state) => dispatchContextValue({ isFilterPizzaPremake: state }),
            }}
        >
            {children}
            <WebSocketListener
            />
        </AppContext.Provider>
    );
}
