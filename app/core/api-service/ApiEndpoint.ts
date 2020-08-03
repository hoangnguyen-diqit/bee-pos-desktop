import { config } from "../../config";

export const BASE_ENDPOINT                                  = config.apis.baseUrl + "";
export const AUTH_ENDPOINT                                  = config.apis.baseUrl + "/auth";
export const TENANT_ENDPOINT                                = config.apis.baseUrl + "/tenant/v1";
export const SYSTEM_ENDPOINT                                = config.apis.baseUrl + "/system/v1";
export const MENU_ENDPOINT                                  = config.apis.baseUrl + "/menu/v1";
export const DRIVER_ENDPOINT                                = config.apis.baseUrl + "/driver/v1";
export const CUSTOMER_ENDPOINT                              = config.apis.baseUrl + "/customer/v1";

//
// Authentication
export const APIS_AUTH__REGISTER                            = BASE_ENDPOINT + "/auth/register"; // POST
export const APIS_AUTH__LOGIN                               = BASE_ENDPOINT + "/auth/customers/login"; // POST
export const APIS_AUTH__LOGOUT                              = BASE_ENDPOINT + "/auth/sign-out"; // POST
export const APIS_AUTH__REFRESH_TOKEN                       = BASE_ENDPOINT + "/auth/refresh-token"; // POST

export const APIS_TENANT__USER_LOGIN                        = TENANT_ENDPOINT + "/user/login"; // POST
