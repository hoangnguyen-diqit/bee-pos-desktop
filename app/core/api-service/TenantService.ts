import { apiPost } from "./ApiCaller";
import {
    APIS_TENANT__USER_LOGIN,
} from "./ApiEndpoint";

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
