import electronSettings from "electron-settings";

import { apiPost } from "./ApiCaller";
import {
    APIS_STORE__USER_LOGIN,
} from "./ApiEndpoint";

import { LOCAL_STORAGE } from "../../utils/Constants";

export function apiStore_login(data: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPost(APIS_STORE__USER_LOGIN, data)
            .then(res => {
                electronSettings.set(LOCAL_STORAGE.ACCESS_TOKEN, res.data.data.token);
                resolve(res.data.data);
            })
            .catch(error => {
                reject(error && error.response ? error.response.data : {});
            });
    })
};
