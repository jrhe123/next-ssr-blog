import { useCallback } from "react";

import {
  articleActions,
  selectIsLoading,
  selectArticles,
  selectArticle,
} from "features/article/store";
import {
  Article,
  ArticleFormInput,
  CommentFormInput,
  GetArticleFormInput,
} from "features/article/types";
import { useAppDispatch, useAppSelector } from "store/hooks";

export type ArticleServiceOperators = {
  isLoading: boolean;
  articles: Article[];
  article: Article | null;
  publishArticle: (data: ArticleFormInput) => void;
  updateArticle: (data: ArticleFormInput) => void;
  publishComment: (data: CommentFormInput) => void;
  getArticle: (data: GetArticleFormInput) => void;
};

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useArticleService = (): Readonly<ArticleServiceOperators> => {
  const dispatch = useAppDispatch();
  return {
    isLoading: useAppSelector(selectIsLoading),
    articles: useAppSelector(selectArticles),
    article: useAppSelector(selectArticle),
    publishArticle: useCallback(
      (form: ArticleFormInput) => {
        dispatch(articleActions.publishArticleRequest(form));
      },
      [dispatch]
    ),
    updateArticle: useCallback(
      (form: ArticleFormInput) => {
        dispatch(articleActions.updateArticleRequest(form));
      },
      [dispatch]
    ),
    publishComment: useCallback(
      (form: CommentFormInput) => {
        dispatch(articleActions.publishCommentRequest(form));
      },
      [dispatch]
    ),
    getArticle: useCallback(
      (form: GetArticleFormInput) => {
        dispatch(articleActions.getArticleRequest(form));
      },
      [dispatch]
    ),
  };
};

export default useArticleService;
