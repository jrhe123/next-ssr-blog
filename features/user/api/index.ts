import makeApi from "libs/core/configureAxios";

import {
  VerifyCodeFormInput,
  SigninFormInput,
  UpdateProfileFormInput,
  User,
  APIResponse,
} from "../types";

const api = makeApi("/");
const USER_BASE_URL = `api/user`;

export const getVerifyCode = (
  form: VerifyCodeFormInput
): Promise<APIResponse<any>> =>
  api.post(USER_BASE_URL + "/sendVerifyCode", form);

export const signin = (form: SigninFormInput): Promise<APIResponse<User>> =>
  api.post(USER_BASE_URL + "/login", form);

export const signout = (): Promise<APIResponse<any>> =>
  api.post(USER_BASE_URL + "/logout");

export const getUserDetail = (): Promise<APIResponse<User>> =>
  api.get(USER_BASE_URL + "/detail");

export const updateUserDetail = (
  form: UpdateProfileFormInput
): Promise<APIResponse<User>> => api.put(USER_BASE_URL + "/update", form);
