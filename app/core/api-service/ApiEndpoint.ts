import { config } from "../../config";

export const BASE_ENDPOINT                                  = config.apis.baseUrl + "";
export const AUTH_ENDPOINT                                  = config.apis.baseUrl + "/auth";

//
// Authentication
export const APIS_AUTH__REGISTER                            = BASE_ENDPOINT + "/auth/register"; // POST
export const APIS_AUTH__CUSTOMER_LOGIN                      = BASE_ENDPOINT + "/auth/customers/login"; // POST
export const APIS_AUTH__LOGOUT                              = BASE_ENDPOINT + "/auth/sign-out"; // POST
export const APIS_AUTH__REFRESH_TOKEN                       = BASE_ENDPOINT + "/auth/refresh-token"; // POST
export const APIS_AUTH__CUSTOMER_LOGIN_BY_FACEBOOK          = BASE_ENDPOINT + "/auth/customers/login-by-facebook"; // POST
export const APIS_AUTH__CUSTOMER_LOGIN_BY_GOOGLE            = BASE_ENDPOINT + "/auth/customers/login-by-google"; // POST
export const APIS_AUTH__CUSTOMER_FORGET_PASSWORD            = BASE_ENDPOINT + "/auth/customers/forgot-password"; // PUT
export const APIS_AUTH__CUSTOMER_RESET_PASSWORD             = BASE_ENDPOINT + "/auth/customers/reset-password"; // PUT

//
// Account
export const APIS_USER__GET_PROFILE                         = BASE_ENDPOINT + "/account/profile"; // GET
export const APIS_USER__CHANGE_PROFILE                      = BASE_ENDPOINT + "/account/profile"; // PUT
export const APIS_USER__CHANGE_AVATAR                       = BASE_ENDPOINT + "/account/profile/change-avatar"; // PUT
export const APIS_USER__CHANGE_PASSWORD                     = BASE_ENDPOINT + "/account/profile/change-password"; // POST
export const APIS_ACCOUNT__ACTIVE_JARS_APP                  = BASE_ENDPOINT + "/account/active-jars-app"; // PUT
export const APIS_PROFILE__LINK_FACEBOOK_ACCOUNT            = BASE_ENDPOINT + "/account/profile/link-facebook-account"; // PUT
export const APIS_PROFILE__LINK_GOOGLE_ACCOUNT              = BASE_ENDPOINT + "/account/profile/link-google-account"; // PUT

export const APIS_ACCOUNT__FIND_MANY                        = BASE_ENDPOINT + "/account/customers?page={page}&size={size}"; // GET
export const APIS_ACCOUNT__FIND_BY_ID                       = BASE_ENDPOINT + "/account/customers/{id}"; // GET
export const APIS_ACCOUNT__SEARCH                           = BASE_ENDPOINT + "/account/customers/search?page={page}&size={size}"; // GET
export const APIS_ACCOUNT__INSERT                           = BASE_ENDPOINT + "/account/customers"; // POST
export const APIS_ACCOUNT__UPDATE                           = BASE_ENDPOINT + "/account/customers/{id}"; // PUT
export const APIS_ACCOUNT__DELETE                           = BASE_ENDPOINT + "/account/customers/{id}"; // DELETE
export const APIS_ACCOUNT__GET_ROLES                        = BASE_ENDPOINT + "/account/customers/{id}/roles"; // GET

export const APIS_STAFF__SEARCH                             = BASE_ENDPOINT + "/account/staffs/search?page={page}&size={size}"; // GET
export const APIS_STAFF__FIND_ONE_BY_ID                     = BASE_ENDPOINT + "/account/staffs/{id}"; // GET
export const APIS_STAFF__INSERT                             = BASE_ENDPOINT + "/account/staffs"; // POST
export const APIS_STAFF__UPDATE                             = BASE_ENDPOINT + "/account/staffs/{id}"; // PUT
export const APIS_STAFF__DELETE                             = BASE_ENDPOINT + "/account/staffs/{id}"; // DELETE

export const APIS_COVER_IMAGE__FIND_MANY                    = BASE_ENDPOINT + "/account/cover-images?page={page}&size={size}"; // GET
export const APIS_COVER_IMAGE__SEARCH                       = BASE_ENDPOINT + "/account/cover-images/search?page={page}&size={size}"; // GET
export const APIS_COVER_IMAGE__FIND_BY_ID                   = BASE_ENDPOINT + "/account/cover-images/{id}"; // GET
export const APIS_COVER_IMAGE__FIND_ONE                     = BASE_ENDPOINT + "/account/cover-images/find-one?1=1"; // GET
export const APIS_COVER_IMAGE__INSERT                       = BASE_ENDPOINT + "/account/cover-images"; // POST
export const APIS_COVER_IMAGE__UPDATE                       = BASE_ENDPOINT + "/account/cover-images/{id}"; // PUT
export const APIS_COVER_IMAGE__DELETE                       = BASE_ENDPOINT + "/account/cover-images/{id}"; // DELETE
export const APIS_COVER_IMAGE__FIND_BY_SLUG                 = BASE_ENDPOINT + "/account/cover-images/find-by-slug/{slug}"; // GET

//
// Service
export const APIS_CAT__FIND_MANY                            = BASE_ENDPOINT + "/service/cats?page={page}&size={size}"; // GET
export const APIS_CAT__SEARCH                               = BASE_ENDPOINT + "/service/cats/search?page={page}&size={size}"; // GET
export const APIS_CAT__FIND_BY_ID                           = BASE_ENDPOINT + "/service/cats/{id}"; // GET
export const APIS_CAT__INSERT                               = BASE_ENDPOINT + "/service/cats"; // POST
export const APIS_CAT__UPDATE                               = BASE_ENDPOINT + "/service/cats/{id}"; // PUT
export const APIS_CAT__DELETE                               = BASE_ENDPOINT + "/service/cats/{id}"; // DELETE

export const APIS_PLACE__FIND_MANY                          = BASE_ENDPOINT + "/service/places?page={page}&size={size}"; // GET
export const APIS_PLACE__FIND_BY_ID                         = BASE_ENDPOINT + "/service/places/{id}"; // GET
export const APIS_PLACE__INSERT                             = BASE_ENDPOINT + "/service/places"; // POST
export const APIS_PLACE__UPDATE                             = BASE_ENDPOINT + "/service/places/{id}"; // PUT
export const APIS_PLACE__DELETE                             = BASE_ENDPOINT + "/service/places/{id}";  // DELETE
export const APIS_PLACE__SEARCH                             = BASE_ENDPOINT + "/service/places/search?page={page}&size={size}"; // GET
export const APIS_PLACE__RANDOM_PLACE                       = BASE_ENDPOINT + "/service/places/random-place?1=1"; // GET

//
// Payment
export const APIS_JARS__FIND_MANY                           = BASE_ENDPOINT + "/payment/jars?page={page}&size={size}"; // GET
export const APIS_JARS__FIND_ONE_BY_ID                      = BASE_ENDPOINT + "/payment/jars/{id}"; // GET
export const APIS_JARS__INSERT                              = BASE_ENDPOINT + "/payment/jars"; // GET
export const APIS_JARS__UPDATE                              = BASE_ENDPOINT + "/payment/jars/{id}"; // GET
export const APIS_JARS__DELETE                              = BASE_ENDPOINT + "/payment/jars/{id}"; // GET
export const APIS_JARS__SEARCH_AND_FILTER                   = BASE_ENDPOINT + "/payment/jars/search?page={page}&size={size}"; // GET

export const APIS_TRANSACTIONS__FIND_MANY                   = BASE_ENDPOINT + "/payment/jars/transactions?page={page}&size={size}"; // GET
export const APIS_TRANSACTIONS__FIND_ONE_BY_ID              = BASE_ENDPOINT + "/payment/jars/transactions/{id}"; // GET
export const APIS_TRANSACTIONS__INSERT                      = BASE_ENDPOINT + "/payment/jars/transactions"; // POST
export const APIS_TRANSACTIONS__UPDATE                      = BASE_ENDPOINT + "/payment/jars/transactions/{id}"; // PUT
export const APIS_TRANSACTIONS__DELETE                      = BASE_ENDPOINT + "/payment/jars/transactions/{id}"; // DELETE
export const APIS_TRANSACTIONS__SEARCH_AND_FILTER           = BASE_ENDPOINT + "/payment/jars/transactions/search?page={page}&size={size}"; // GET
export const APIS_TRANSACTIONS__SEARCH_AND_FILTER_ITEMS     = BASE_ENDPOINT + "/payment/jars/transactions/search-items?page={page}&size={size}"; // GET

//
// Post
export const APIS_TAG__FIND_MANY                            = BASE_ENDPOINT + "/post/tags?page={page}&size={size}"; // GET
export const APIS_TAG__SEARCH                               = BASE_ENDPOINT + "/post/tags/search?page={page}&size={size}"; // GET
export const APIS_TAG__FIND_BY_ID                           = BASE_ENDPOINT + "/post/tags/{id}"; // GET
export const APIS_TAG__INSERT                               = BASE_ENDPOINT + "/post/tags"; // POST
export const APIS_TAG__UPDATE                               = BASE_ENDPOINT + "/post/tags/{id}"; // PUT
export const APIS_TAG__DELETE                               = BASE_ENDPOINT + "/post/tags/{id}"; // DELETE

//
// Notification
export const APIS_POST__FIND_MANY                           = BASE_ENDPOINT + "/post/posts?page={page}&size={size}"; // GET
export const APIS_POST__SEARCH                              = BASE_ENDPOINT + "/post/posts/search?page={page}&size={size}"; // GET
export const APIS_POST__FIND_BY_ID                          = BASE_ENDPOINT + "/post/posts/{id}"; // GET
export const APIS_POST__INSERT                              = BASE_ENDPOINT + "/post/posts"; // POST
export const APIS_POST__UPDATE                              = BASE_ENDPOINT + "/post/posts/{id}"; // PUT
export const APIS_POST__DELETE                              = BASE_ENDPOINT + "/post/posts/{id}"; // DELETE
export const APIS_POST__GET_TAGS                            = BASE_ENDPOINT + "/post/posts/{id}/tags"; // GET

export const APIS_BANNER__FIND_MANY                         = BASE_ENDPOINT + "/banners?page={page}&size={size}"; // GET
export const APIS_BANNER__FIND_BY_ID                        = BASE_ENDPOINT + "/banners/{id}"; // GET
export const APIS_BANNER__INSERT                            = BASE_ENDPOINT + "/banners"; // POST
export const APIS_BANNER__UPDATE                            = BASE_ENDPOINT + "/banners/{id}"; // PUT
export const APIS_BANNER__DELETE                            = BASE_ENDPOINT + "/banners/{id}"; // DELETE
export const APIS_BANNER__FIND_BY_SLUG                      = BASE_ENDPOINT + "/banners/find-by-slug/{slug}"; // GET
export const APIS_BANNER__SEARCH_AND_FILTER                 = BASE_ENDPOINT + "/banners/search?searchKey={searchKey}&page={page}&size={size}"; // append searchFields & filters // GET
export const APIS_BANNER__FIND_ONE                          = BASE_ENDPOINT + "/notification/banners/find-one?"; // GET

export const APIS_NOTIFICATION__FIND_MANY                   = BASE_ENDPOINT + "/notification/notifications?page={page}&pageSize={size}"; // GET
export const APIS_NOTIFICATION__SEARCH                      = BASE_ENDPOINT + "/notification/notifications/search?page={page}&pageSize={size}"; // GET
export const APIS_NOTIFICATION__MY_NOTIFICATIONS            = BASE_ENDPOINT + "/notification/notifications/user-notifications?1=1"; // GET
export const APIS_NOTIFICATION__NEW_COUNT                   = BASE_ENDPOINT + "/notification/notifications/new-count"; // GET
export const APIS_NOTIFICATION__MARK_NEW_READ               = BASE_ENDPOINT + "/notification/notifications/mark-read"; // POST
export const APIS_NOTIFICATION__SEND_CONTACT                = BASE_ENDPOINT + "/notification/notifications/contact"; // POST
export const APIS_NOTIFICATION__REGISTER_TOKEN              = BASE_ENDPOINT + "/notification/notifications/register-token"; // POST

export const APIS_CONTACT__FIND_MANY                        = BASE_ENDPOINT + "/notification/contacts?page={page}&size={size}"; // GET
export const APIS_CONTACT__SEARCH                           = BASE_ENDPOINT + "/notification/contacts/search?page={page}&size={size}"; // GET
export const APIS_CONTACT__FIND_BY_ID                       = BASE_ENDPOINT + "/notification/contacts/{id}"; // GET
export const APIS_CONTACT__FIND_ONE                         = BASE_ENDPOINT + "/notification/contacts/find-one?1=1"; // GET
export const APIS_CONTACT__INSERT                           = BASE_ENDPOINT + "/notification/contacts"; // POST
export const APIS_CONTACT__UPDATE                           = BASE_ENDPOINT + "/notification/contacts/{id}"; // PUT
export const APIS_CONTACT__DELETE                           = BASE_ENDPOINT + "/notification/contacts/{id}"; // DELETE
export const APIS_CONTACT__FIND_BY_SLUG                     = BASE_ENDPOINT + "/notification/contacts/find-by-slug/{slug}"; // GET
export const APIS_CONTACT__SUBSCRIBE_NEWSLETTERS            = BASE_ENDPOINT + "/notification/contacts/subscribe-newsletters"; // POST

//
// Uploads
export const APIS_UPLOAD__UPLOAD_FILE                       = BASE_ENDPOINT + "/upload/upload-file"; // POST form

//
// Public
export const API_COMMON__GET_IP_INFO                        = BASE_ENDPOINT + "/public/ip-info"; // GET
export const APIS_PUBLIC__GET_POSTS                         = BASE_ENDPOINT + "/public/posts?page={page}&size={size}"; // GET
export const APIS_PUBLIC__GET_POSTS_BY_ID                   = BASE_ENDPOINT + "/public/posts/{slug}"; // GET
export const APIS_PUBLIC__GET_POSTS_BY_CATEGORY_SLUG        = BASE_ENDPOINT + "/public/posts/find-by-category/{slug}?page={page}&size={size}"; // GET
export const APIS_PUBLIC__GET_CATEGORY_BY_SLUG              = BASE_ENDPOINT + "/public/categories/{slug}"; // GET
export const APIS_PUBLIC__GET_PLAYLIST_ITEMS_BY_PLAYLIST_ID = BASE_ENDPOINT + "/public/playlist/{id}/items?"; // GET
export const APIS_PUBLIC__GET_SEARCH_BANNERS                = BASE_ENDPOINT + "/public/banners/search?page={page}&size={size}"; // append searchFields & filters // GET
export const APIS_PUBLIC__GET_FIND_ONE_BANNER               = BASE_ENDPOINT + "/public/banners/find-one?"; // GET
export const APIS_PUBLIC__GET_SETTING_BY_NAME               = BASE_ENDPOINT + "/public/settings/find-one?name={name}"; // GET
export const APIS_NOTIFICATION__SEND_PUBLIC_CONTACT         = BASE_ENDPOINT + "/public/notifications/contact"; // POST
export const APIS_PUBLIC__ACCOUNT_FORGOT_PASSWORD           = BASE_ENDPOINT + "/public/accounts/forgot-password"; // PUT
export const APIS_PUBLIC__ACCOUNT_RESET_PASSWORD            = BASE_ENDPOINT + "/public/accounts/reset-password"; // PUT
export const APIS_PUBLIC__SUBSCRIBE_CONTACT_NEWSLETTERS     = BASE_ENDPOINT + "/public/contacts/subscribe-newsletters"; // POST
