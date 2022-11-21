import { useCallback } from "react";

import { articleActions, selectIsLoading } from "features/article/store";
import { Article, ArticleFormInput } from "features/article/types";
import { useAppDispatch, useAppSelector } from "store/hooks";

export type ArticleServiceOperators = {
  isLoading: boolean;
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
    publishArticle: useCallback(
      (form: ArticleFormInput) => {
        dispatch(articleActions.publishArticleRequest(form));
      },
      [dispatch]
    ),
  };
};

export default useArticleService;
