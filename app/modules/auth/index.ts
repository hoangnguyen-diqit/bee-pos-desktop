import LoginPage from "./login/LoginPage";

import loginReducer from "./login/LoginReducer";

export const AuthModule = [
    { path: "/login", component: LoginPage, exact: true, isPrivate: false },
];

export const authReducers = {
    loginReducer,
};
