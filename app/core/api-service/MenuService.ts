import electronSettings from "electron-settings";
import pako from "pako";

import { LOCAL_STORAGE } from "../../utils/Constants";

import { apiPost, apiGetGzip } from "./ApiCaller";
import {
    APIS_MENU__EXPORT_ALL_DATA,
} from "./ApiEndpoint";

export function apiMenu_exportAllData() {
    return new Promise((resolve, reject) => {
        const storeUuid = electronSettings.getSync(LOCAL_STORAGE.STORE_UUID);
        apiPost(APIS_MENU__EXPORT_ALL_DATA, {
            store_uuid: storeUuid,
        }, {}, { "x-client-id": "3b8a7c10-b1b1-11e9-8e0f-4389b2fc3a77", })
        .then(res => {
            apiGetGzip(res.data.data.url)
            .then(res2 => {
                console.log("Call Gzip");
                console.log(res2.body)
                var result = pako.inflate(res2.body, { to: "string" });
                var string = Buffer.from(res2.body);
                console.log("Gzip string: " + result);
                resolve({
                    url: res2,
                })
            })
            .catch(err2 => {
                console.log("Call Gzip error: " + err2);
                reject(err2.response.data);
            })
        })
        .catch(err => {
            reject(err.response.data);
        })
    })
}
