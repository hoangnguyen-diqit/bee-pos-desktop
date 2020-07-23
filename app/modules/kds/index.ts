import KdsMakeTablePage from "./make-table/KdsMakeTablePage";
import KdsCutTablePage from "./cut-table/KdsCutTablePage";
import KdsHistoryPage from "./history/KdsHistoryPage";

import kdsMakeTableReducer from "./make-table/KdsMakeTableReducer";
import kdsCutTableReducer from "./cut-table/KdsCutTableReducer";
import kdsHistoryReducer from "./history/KdsHistoryReducer";

export const KdsModule = [
    { path: "/make-table", component: KdsMakeTablePage, exact: true, isPrivate: false },
    { path: "/cut-table", component: KdsCutTablePage, exact: false, isPrivate: false },
    { path: "/kds-history", component: KdsHistoryPage, exact: false, isPrivate: true },
];

export const kdsReducers = {
    kdsMakeTableReducer,
    kdsCutTableReducer,
    kdsHistoryReducer,
};
