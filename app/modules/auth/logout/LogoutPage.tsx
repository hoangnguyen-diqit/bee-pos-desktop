import React from "react";
import electronSettings from "electron-settings";

import { LOCAL_STORAGE } from "../../../utils/Constants";

import { AppContext } from "../../../AppContext";

export default function LogoutPage() {

    const {
        history,
        updateProfile,
    } = React.useContext(AppContext);

    React.useEffect(() => {
        electronSettings.unsetSync(LOCAL_STORAGE.ACCESS_TOKEN);
        updateProfile(undefined);

        if (history) {
            history.push(`/`);
        }
    }, []);

    return null;
}
