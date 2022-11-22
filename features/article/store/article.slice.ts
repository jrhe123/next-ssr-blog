// DUCKS pattern
import {
  createAction,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { Article, ArticleFormInput } from "features/article/types";
import type { RootState } from "store";

export interface ArticleState {
  isLoading: boolean;
  articles: Article[];
  errors?: Error[];
}

const initialState: ArticleState = {
  isLoading: false,
  articles: [],
  errors: [],
};

// slice
export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    // publish
    publishArticleRequest(state, action: PayloadAction<ArticleFormInput>) {
      state.isLoading = true;
      state.errors = [];
    },
    publishArticleSucceeded(state) {
      state.isLoading = false;
    },
    publishArticleFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        const {
          payload: {
            article: { articles },
          },
        } = action as any;
        const nextState = {
          ...state,
          articles,
        };
        return nextState;
      })
      .addDefaultCase((state, action) => {});
  },
});

// Actions
export const articleActions = {
  publishArticleRequest: articleSlice.actions.publishArticleRequest,
  publishArticleSucceeded: articleSlice.actions.publishArticleSucceeded,
  publishArticleFailed: articleSlice.actions.publishArticleFailed,
};

// Selectors
export const selectIsLoading = (state: RootState) => state.article.isLoading;
export const selectArticles = (state: RootState) => state.article.articles;

// Reducer
export default articleSlice.reducer;
