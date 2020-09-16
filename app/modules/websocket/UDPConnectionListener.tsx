import { useEffect } from "react";
import { ipcRenderer } from "electron";

type Props = {
    onDetected?: (data) => void,
};

export function UDPConnectionListener(props: Props) {

    useEffect(() => {
        ipcRenderer.on("udpServerResp", (ev, args) => {
            if (props.onDetected) {
                props.onDetected(args);
            }
        })

        return (() => {
            ipcRenderer.removeListener("udpServerResp", (ev, args) => {})
        })
    }, []);

    return null;
}
