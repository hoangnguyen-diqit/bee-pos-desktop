import moment from "moment";
import electronSettings from "electron-settings";

import { apiPost } from "./ApiCaller";
import {
    APIS_TENANT__USER_LOGIN,
} from "./ApiEndpoint";
import { LOCAL_STORAGE } from "../../utils/Constants";

export function apiAuth_login(data: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPost(APIS_TENANT__USER_LOGIN, data)
            .then(res => {
                const expiresIn = !isNaN(res.data.expires_in) ? moment.unix(res.data.expires_in).toDate() : undefined;

                electronSettings.set(LOCAL_STORAGE.ACCESS_TOKEN, res.data.access_token);
                electronSettings.set(LOCAL_STORAGE.ACCESS_TOKEN_EXPIRES_IN, res.data.expires_in);
                electronSettings.set(LOCAL_STORAGE.REFRESH_TOKEN, res.data.refresh_token);

                const user = res.data.user;
                const userInfo = {
                    id: user.id,
                }
                electronSettings.set(LOCAL_STORAGE.LOGGED_USER, JSON.stringify(userInfo));

                resolve({
                    user: user,
                });
            })
            .catch(error => {
                reject(error && error.response ? error.response.data : {});
            });
    })
};
