import React from 'react'
import { History } from 'history';

import { AppContext } from './AppContext';

import { WebSocketListener } from './modules/websocket/WebSocketListener';
import { WsServerListener } from './modules/websocket/WsServerListener';

import { MessageDialog } from './core-ui/dialog/MessageDialog';
import { ServerDetectedDialog } from './shared/server-detected-dialog/ServerDetectedDialog';
import { SelectServerDialog } from './shared/select-server-dialog/SelectServerDialog';
import { LeftnavDialog } from './shared/leftnav-dialog/LeftnavDialog';

import { AppInitializer } from './AppInitializer';
import { WsClient } from './thirdparty/ws';

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

        profile: undefined,
    });

    const [ isOpenMessageDialog, setIsOpenMessageDialog ] = React.useState(false);
    const _serverDetectedDialogRef = React.createRef<ServerDetectedDialog>();
    const _selectServerDialogRef = React.createRef<SelectServerDialog>();

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
            <WsClient>
                {children({
                    profile: contextValue.profile,
                })}
            </WsClient>
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
            <WsServerListener
            />
            <WebSocketListener
                // onServerDetected={_handleServerDetected}
                // onSelectServerIP={_handleSelectServerIP}
                // onNewOrder={_handleServerData}
            />
        </AppContext.Provider>
    );
}
