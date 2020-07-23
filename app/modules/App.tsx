import React, { ReactNode } from 'react'
import { History } from 'history';

import { AppContext } from '../AppContext';

import { WebSocketListener } from './websocket/WebSocketListener';

import { SettingSidebar } from '../shared/setting-sidebar/SettingSidebar';

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
    const [ contextValue, dispatchContextValue ] = React.useReducer(contextValueReducer, {});

    return (
        <AppContext.Provider
            value={{
                history: props.history,
                isShowSettingBar: contextValue.isShowSettingBar,

                toggleSettingBar: (state) => dispatchContextValue({ isShowSettingBar: state }),
            }}
        >
            {children}
            <WebSocketListener
            />
            <SettingSidebar
            />
        </AppContext.Provider>
    );
}
