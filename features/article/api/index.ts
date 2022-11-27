import makeApi from "libs/core/configureAxios";

import {
  ArticleFormInput,
  Article,
  CommentFormInput,
  Comment,
  APIResponse,
  GetArticleFormInput,
} from "../types";

const api = makeApi("/");
const ARTICLE_BASE_URL = `api/article`;
const COMMENT_BASE_URL = `api/comment`;

export const publishArticle = (
  form: ArticleFormInput
): Promise<APIResponse<Article>> =>
  api.post(ARTICLE_BASE_URL + "/publish", form);

export const updateArticle = (
  form: ArticleFormInput
): Promise<APIResponse<Article>> => api.put(ARTICLE_BASE_URL + "/update", form);

export const publishComment = (
  form: CommentFormInput
): Promise<APIResponse<Comment>> =>
  api.post(COMMENT_BASE_URL + "/publish", form);

export const getArticle = (
  form: GetArticleFormInput
): Promise<APIResponse<Article[]>> => {
  return api.get(ARTICLE_BASE_URL + `/get?tagId=${form.tagId}`);
};
