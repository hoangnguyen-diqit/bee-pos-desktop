import React from 'react'
import { History } from 'history';
import { useDispatch } from 'react-redux';

import { AppContext } from './AppContext';

import { createSocket } from "./core/websocket/websocket-client";
import { WebSocketListener } from './modules/websocket/WebSocketListener';

import { catalog_newOrderCame } from './AppReducer';

import { MessageDialog } from './core-ui/dialog/MessageDialog';
import { ServerDetectedDialog } from './shared/server-detected-dialog/ServerDetectedDialog';
import { SelectServerDialog } from './shared/select-server-dialog/SelectServerDialog';

import { AppInitializer } from './AppInitializer';

const contextValueReducer = (state, action) => {
    return {
        ...state,
        ...action,
    }
}

type Props = {
    history: History,
    children: ({ profile }) => React.ReactNode;
};

export default function App(props: Props) {
    const { children } = props;
    const [ contextValue, dispatchContextValue ] = React.useReducer(contextValueReducer, {
        isShowSettingBar: false,
        isFilterPizzaPremake: false,

        profile: null,
    });
    const dispatch = useDispatch();

    const _messageDialogRef = React.createRef<MessageDialog>();
    const _serverDetectedDialogRef = React.createRef<ServerDetectedDialog>();
    const _selectServerDialogRef = React.createRef<SelectServerDialog>();

    const _handleWebSocket = (serverIP) => {
        createSocket({
            serverIP,
            onConnected: () => {
                console.log("Connected.");
                if (_messageDialogRef && _messageDialogRef.current) {
                    _messageDialogRef.current.show({ message: "Connected" });
                }
            },
            onData: (data) => {
                console.log(data);
                if (_handleServerData) {
                    _handleServerData(data);
                }
            },
            onError: () => {
                if (_messageDialogRef && _messageDialogRef.current) {
                    _messageDialogRef.current.show({ message: "Connection failed" });
                }
            },
        });
    }

    const _handleServerDetected = (data) => {
        if (_serverDetectedDialogRef && _serverDetectedDialogRef.current) {
            _serverDetectedDialogRef.current.show({ message: data.address }, () => {
                _handleWebSocket(data.address);
            })
        }
    }

    const _handleSelectServerIP = () => {
        if (_selectServerDialogRef && _selectServerDialogRef.current) {
            _selectServerDialogRef.current.show({}, (data) => {
                _handleWebSocket(data.serverIP);
            })
        }
    }

    const _handleServerData = (data) => {
        if (_messageDialogRef && _messageDialogRef.current) {
            _messageDialogRef.current.show({ message: "New orders came: " + JSON.stringify(data) });
        }
        console.log("New orders came: " + data);
        dispatch(catalog_newOrderCame(data));

        if (data && data.actionType) {
            switch (data.actionType) {
                default:
                    break;
            }
        }
    }

    return (
        <AppContext.Provider
            value={{
                history: props.history,
                isShowSettingBar: contextValue.isShowSettingBar,
                isFilterPizzaPremake: contextValue.isFilterPizzaPremake,

                profile: contextValue.profile,

                toggleSettingBar: (state) => dispatchContextValue({ isShowSettingBar: state }),
                toggleFilterPizzaPremake: (state) => dispatchContextValue({ isFilterPizzaPremake: state }),

                updateProfile: (res) => dispatchContextValue({ profile: res }),
            }}
        >
            <MessageDialog
                ref={_messageDialogRef}
            />
            {children({
                profile: contextValue.profile,
            })}
            <AppInitializer
            />
            <ServerDetectedDialog
                ref={_serverDetectedDialogRef}
            />
            <SelectServerDialog
                ref={_selectServerDialogRef}
            />
            <WebSocketListener
                // onServerDetected={_handleServerDetected}
                // onSelectServerIP={_handleSelectServerIP}
                // onNewOrder={_handleServerData}
            />
        </AppContext.Provider>
    );
}
