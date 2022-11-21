import makeApi from "libs/core/configureAxios";

import { ArticleFormInput, Article, APIResponse } from "../types";

const api = makeApi("/");
const USER_BASE_URL = `api/article`;

export const publishArticle = (
  form: ArticleFormInput
): Promise<APIResponse<Article>> => api.post(USER_BASE_URL + "/publish", form);
