import HomePage from "./home/HomePage";

import homeReducer from "./home/HomeReducer";

export const HomeModule = [
    { path: "/home", component: HomePage, exact: true, isPrivate: false },
];

export const homeReducers = {
    homeReducer,
};
