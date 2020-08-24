import moment from "moment";
import electronSettings from "electron-settings";

import { apiPost } from "./ApiCaller";
import {
    APIS_TENANT__USER_LOGIN,
} from "./ApiEndpoint";
import { LOCAL_STORAGE } from "../../utils/Constants";

export function apiTenant_login(data: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPost(APIS_TENANT__USER_LOGIN, data)
            .then(res => {

                resolve({
                    user: res.data.data,
                });
            })
            .catch(error => {
                reject(error && error.response ? error.response.data : {});
            });
    })
};
