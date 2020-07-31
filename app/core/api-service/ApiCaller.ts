import axios from 'axios';
import objectAssign from 'object-assign';
import electronSettings from "electron-settings";
import queryString from "query-string";

import { LOCAL_STORAGE } from "../../utils/Constants";

export function defaultHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${electronSettings.get(LOCAL_STORAGE.ACCESS_TOKEN)}`,
    }
}

export function apiRequest(endpoint: string, method: 'GET' | "POST" | 'PUT' | 'DELETE', body: Object = {}, params: Object = {}, headers: Object = {}) {
    return axios.request({
        url: endpoint,
        method: method,
        data: body,
        params: params,
        headers: objectAssign(defaultHeaders(), headers),
    });
}

export function apiGet(endpoint: string, params: Object = {}, headers: Object = {}) {
    return axios.get(endpoint, {
        params: params,
        headers: objectAssign(defaultHeaders(), headers),
    });
}

export function apiGetIpInfo(endpoint: string, params: Object = {}, headers: Object = {}) {
    return axios.get(endpoint, {
        params: params,
    });
}

export function apiPost(endpoint: string, body: Object = {}, params: Object = {}, headers: Object = {}) {
    return axios.post(endpoint, JSON.stringify(body), {
        params: params,
        headers: objectAssign(defaultHeaders(), headers),
    });
}

export function apiPostForm(endpoint: string, fd: FormData, params: Object = {}, headers: Object = {"Content-Type": "multipart/form-data"}) {
    return axios.post(endpoint, fd, { // fd: FormData
        params: params,
        headers: objectAssign(defaultHeaders(), headers),
    });
}

export function apiPostUrlencoded(endpoint: string, body: Object = {}, params: Object = {}, headers: Object = {"content-type": "application/x-www-form-urlencoded", "accept": "application/x-www-form-urlencoded"}) {
    return axios.post(endpoint, queryString.stringify(body, {strict: false}), {
        params: params,
        headers: objectAssign({}, defaultHeaders(), headers),
    });
}

export function apiPut(endpoint: string, body: Object = {}, params: Object = {}, headers: Object = {}) {
    return axios.put(endpoint, body, {
        params: params,
        headers: objectAssign(defaultHeaders(), headers),
    });
}

export function apiDelete(endpoint: string, params: Object = {}, headers: Object = {}) {
    return axios.delete(endpoint, {
        params: params,
        headers: objectAssign(defaultHeaders(), headers),
    });
}

export function apiPatch(endpoint: string, body: Object = {}, params: Object = {}, headers: Object = {}) {
    return axios.patch(endpoint, body, {
        params: params,
        headers: objectAssign(defaultHeaders(), headers),
    });
}

export function apiHead(endpoint: string, params: Object = {}, headers: Object = {}) {
    return axios.head(endpoint, {
        params: params,
        headers: objectAssign(defaultHeaders(), headers),
    });
}
