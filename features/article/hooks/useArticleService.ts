import { useCallback } from "react";

import {
  articleActions,
  selectIsLoading,
  selectArticles,
} from "features/article/store";
import { Article, ArticleFormInput } from "features/article/types";
import { useAppDispatch, useAppSelector } from "store/hooks";

export type ArticleServiceOperators = {
  isLoading: boolean;
  articles: Article[];
  publishArticle: (data: ArticleFormInput) => void;
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
    publishArticle: useCallback(
      (form: ArticleFormInput) => {
        dispatch(articleActions.publishArticleRequest(form));
      },
      [dispatch]
    ),
  };
};

export default useArticleService;
