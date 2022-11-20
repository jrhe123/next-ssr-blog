import makeApi from "libs/core/configureAxios";

import {
  VerifyCodeFormInput,
  SigninFormInput,
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
