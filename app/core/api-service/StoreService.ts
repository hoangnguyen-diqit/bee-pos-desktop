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
                electronSettings.setSync(LOCAL_STORAGE.ACCESS_TOKEN, res.data.data.token);

                if (Array.isArray(res.data.data.stores) && res.data.data.stores.length > 0) {
                    electronSettings.setSync(LOCAL_STORAGE.STORE_UUID, res.data.data.stores[0].uuid);
                }
                resolve(res.data.data);
            })
            .catch(error => {
                reject(error && error.response ? error.response.data : {});
            });
    })
};
