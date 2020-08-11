import LoginPage from "./login/LoginPage";
import LoginTenantPage from "./login-tenant/LoginTenantPage";
import LogoutPage from "./logout/LogoutPage";

import loginReducer from "./login/LoginReducer";
import loginTenantReducer from "./login-tenant/LoginTenantReducer";

export const AuthModule = [
    { path: "/login", component: LoginPage, exact: true, isPrivate: false },
    { path: "/login-tenant", component: LoginTenantPage, exact: true, isPrivate: false },
    { path: "/logout", component: LogoutPage, exact: true, isPrivate: false },
];

export const authReducers = {
    loginReducer,
    loginTenantReducer,
};
