import React, { useContext } from "react";
import electronSettings from "electron-settings";
import { useDispatch } from "react-redux";

import { LOCAL_STORAGE } from "./utils/Constants";

import { apiMenu_exportAllData } from "./core/api-service/MenuService";

import {
    catalog_findManyCategoriesSuccess,
    catalog_findManyCategoriesFailure,
    catalog_findManyProductsSuccess,
    catalog_findManyProductsFailure,
} from "./AppReducer";

import { AppContext } from "./AppContext";

export function AppInitializer() {
    const accessToken = electronSettings.getSync(LOCAL_STORAGE.ACCESS_TOKEN);
    const loggedInUserId = electronSettings.getSync(LOCAL_STORAGE.LOGGED_USER_ID);
    const { profile } = useContext(AppContext);

    const dispatch = useDispatch();

    const {
        history,
        updateProfile,
    } = React.useContext(AppContext);

    const _checkAccessToken = () => {

    }

    React.useEffect(() => {
        console.log("Initial 1: " + profile)
        if (!accessToken) {
            if (history) {
                history.push(`/logout`);
            }
        } else {
            if (updateProfile) {
                updateProfile({ uuid: loggedInUserId })
            }
        }
    }, []);

    React.useEffect(() => {
        console.log("Initial 1: " + profile)
        if (!profile) {
        } else {
            apiMenu_exportAllData()
            .then((res: any) => {
                // console.log(JSON.stringify(res.catalogue_product));
                dispatch(catalog_findManyCategoriesSuccess(res.catalogue_category || []));
                dispatch(catalog_findManyProductsSuccess(res.catalogue_product || []));
            })
            .catch(err => {
                dispatch(catalog_findManyCategoriesFailure());
                dispatch(catalog_findManyProductsFailure());
            })
        }
    }, [profile?.uuid]);

    console.log("Initial 0: " + profile);
    return null;
}
