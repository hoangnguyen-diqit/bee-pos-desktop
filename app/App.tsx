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
import { LeftnavDialog } from './shared/leftnav-dialog/LeftnavDialog';
import { FooterStickyBar } from './shared/footer-sticky-bar/FooterStickyBar';

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
        isOpenLeftnav: false,
        isShowSettingBar: false,
        isFilterPizzaPremake: false,
        isOpenFooterStickyBar: false,

        profile: null,
    });
    const dispatch = useDispatch();

    const [ isOpenMessageDialog, setIsOpenMessageDialog ] = React.useState(false);
    const _serverDetectedDialogRef = React.createRef<ServerDetectedDialog>();
    const _selectServerDialogRef = React.createRef<SelectServerDialog>();

    const _handleWebSocket = (serverIP) => {
        createSocket({
            serverIP,
            onConnected: () => {
                console.log("Connected.");
            },
            onData: (data) => {
                console.log(data);
                if (_handleServerData) {
                    _handleServerData(data);
                }
            },
            onError: () => {
                console.log("Connection failed");
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
                isOpenLeftnav: contextValue.isOpenLeftnav,
                isShowSettingBar: contextValue.isShowSettingBar,
                isFilterPizzaPremake: contextValue.isFilterPizzaPremake,

                profile: contextValue.profile,

                toggleSettingBar: (state) => dispatchContextValue({ isShowSettingBar: state }),
                toggleFilterPizzaPremake: (state) => dispatchContextValue({ isFilterPizzaPremake: state }),
                toggleLeftnav: (state) => dispatchContextValue({ isOpenLeftnav: state }),
                toggleFooterStickyBar: (state) => dispatchContextValue({ isOpenFooterStickyBar: state }),

                updateProfile: (res) => dispatchContextValue({ profile: res }),
            }}
        >
            <MessageDialog
                isOpen={isOpenMessageDialog}
                toggleOpen={() => setIsOpenMessageDialog(!isOpenMessageDialog)}
                value={""}
                onChange={(res) => {
                    if (res.type === "cancel") {
                        setIsOpenMessageDialog(false);
                    } else if (res.type === "ok") {
                        setIsOpenMessageDialog(false);
                    }
                }}
            />
            {children({
                profile: contextValue.profile,
            })}
            <LeftnavDialog
                isOpen={contextValue.isOpenLeftnav}
                toggleOpen={() => dispatchContextValue({ "isOpenLeftnav": !contextValue.isOpenLeftnav})}
                value={""}
                onChange={() => {}}
            />
            {/* <FooterStickyBar
                isOpen={contextValue.isOpenFooterStickyBar}
            /> */}
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
