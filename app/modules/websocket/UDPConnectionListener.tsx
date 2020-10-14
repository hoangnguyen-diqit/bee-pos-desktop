import { useEffect, useContext } from "react";
import { ipcRenderer } from "electron";
import log from "electron-log";

import { AppContext } from "../../AppContext";

type Props = {
    onDetected?: (data) => void,
};

export function UDPConnectionListener(props: Props) {

    const {
        serverAddress,
    } = useContext(AppContext);

    useEffect(() => {
        ipcRenderer.on("udpServerResp", (ev, args) => {
            log.info("UDP server list: " + JSON.stringify(args));
            if (props.onDetected) {
                props.onDetected(args);
            }
        })
        ipcRenderer.send("reconnectWs", {});

        return (() => {
            ipcRenderer.removeListener("udpServerResp", (ev, args) => {})
        })
    }, [ serverAddress ]);

    return null;
}
