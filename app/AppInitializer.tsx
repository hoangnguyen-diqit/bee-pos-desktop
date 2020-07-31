import React from "react";
import electronSettings from "electron-settings";

import { LOCAL_STORAGE } from "./utils/Constants";

import { AppContext } from "./AppContext";

export function AppInitializer() {
    const accessToken = electronSettings.getSync(LOCAL_STORAGE.ACCESS_TOKEN);

    const {
        history,
        updateProfile,
    } = React.useContext(AppContext);

    const _checkAccessToken = () => {

    }

    React.useEffect(() => {
        if (!accessToken) {
            if (history) {
                history.push(`/login`);
            }
        } else {
            if (updateProfile) {
                updateProfile({ id: "12345" })
            }
        }
    }, [accessToken]);

    return null;
}
