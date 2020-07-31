import moment from "moment";
import electronSettings from "electron-settings";

import { apiPostUrlencoded, apiPut } from "./ApiCaller";
import {
    APIS_AUTH__CUSTOMER_LOGIN,
    APIS_AUTH__CUSTOMER_LOGIN_BY_FACEBOOK,
    APIS_AUTH__CUSTOMER_LOGIN_BY_GOOGLE,
    APIS_AUTH__REFRESH_TOKEN,
    APIS_AUTH__CUSTOMER_FORGET_PASSWORD,
    APIS_AUTH__CUSTOMER_RESET_PASSWORD,
} from "./ApiEndpoint";
import { LOCAL_STORAGE } from "../../utils/Constants";

export function apiAuth_login(data: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPostUrlencoded(APIS_AUTH__CUSTOMER_LOGIN, data)
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

export function apiAuth_loginByFacebook(data: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPostUrlencoded(APIS_AUTH__CUSTOMER_LOGIN_BY_FACEBOOK, data)
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

export function apiAuth_loginByGoogle(data: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPostUrlencoded(APIS_AUTH__CUSTOMER_LOGIN_BY_GOOGLE, data)
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
    });
}

export function apiAuth_refreshToken(): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPostUrlencoded(APIS_AUTH__REFRESH_TOKEN, { refresh_token: electronSettings.get(LOCAL_STORAGE.REFRESH_TOKEN) })
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

export function apiAuth_customerForgotPassword(data: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPut(APIS_AUTH__CUSTOMER_FORGET_PASSWORD, data)
            .then(res => {
                resolve();
            })
            .catch(error => {
                reject(error && error.response ? error.response.data : {});
            });
    });
};

export function apiAuth_customerResetPassword(data: Object): Promise<any> {
    return new Promise((resolve, reject) => {
        apiPut(APIS_AUTH__CUSTOMER_RESET_PASSWORD, data)
            .then(res => {
                resolve();
            })
            .catch(error => {
                reject(error && error.response ? error.response.data : {});
            });
    });
};
