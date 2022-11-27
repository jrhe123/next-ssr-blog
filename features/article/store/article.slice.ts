// DUCKS pattern
import {
  createAction,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import {
  Article,
  ArticleFormInput,
  Comment,
  CommentFormInput,
  GetArticleFormInput,
} from "features/article/types";
import type { RootState } from "store";

export interface ArticleState {
  isLoading: boolean;
  articles: Article[];
  article: Article | null;
  errors?: Error[];
}

const initialState: ArticleState = {
  isLoading: false,
  articles: [],
  article: null,
  errors: [],
};

// slice
export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    // publish article
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
    // update article
    updateArticleRequest(state, action: PayloadAction<ArticleFormInput>) {
      state.isLoading = true;
      state.errors = [];
    },
    updateArticleSucceeded(state) {
      state.isLoading = false;
    },
    updateArticleFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // publish comment
    publishCommentRequest(state, action: PayloadAction<CommentFormInput>) {
      state.isLoading = true;
      state.errors = [];
    },
    publishCommentSucceeded(state, action: PayloadAction<Comment>) {
      // append comment to the end of list
      if (state.article) {
        if (!state.article.comments?.length) {
          state.article.comments = [];
        }
        state.article.comments.push(action.payload);
      }
      state.isLoading = false;
    },
    publishCommentFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // get articles
    getArticleRequest(state, action: PayloadAction<GetArticleFormInput>) {
      state.isLoading = true;
      state.errors = [];
    },
    getArticleSucceeded(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
      state.isLoading = false;
    },
    getArticleFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        const {
          payload: {
            article: { articles, article },
          },
        } = action as any;
        const nextState = {
          ...state,
          articles,
          article,
        };
        return nextState;
      })
      .addDefaultCase((state, action) => {});
  },
});

// Actions
export const articleActions = {
  // publish article
  publishArticleRequest: articleSlice.actions.publishArticleRequest,
  publishArticleSucceeded: articleSlice.actions.publishArticleSucceeded,
  publishArticleFailed: articleSlice.actions.publishArticleFailed,
  // update article
  updateArticleRequest: articleSlice.actions.updateArticleRequest,
  updateArticleSucceeded: articleSlice.actions.updateArticleSucceeded,
  updateArticleFailed: articleSlice.actions.updateArticleFailed,
  // publish comment
  publishCommentRequest: articleSlice.actions.publishCommentRequest,
  publishCommentSucceeded: articleSlice.actions.publishCommentSucceeded,
  publishCommentFailed: articleSlice.actions.publishCommentFailed,
  // get article
  getArticleRequest: articleSlice.actions.getArticleRequest,
  getArticleSucceeded: articleSlice.actions.getArticleSucceeded,
  getArticleFailed: articleSlice.actions.getArticleFailed,
};

// Selectors
export const selectIsLoading = (state: RootState) => state.article.isLoading;
export const selectArticles = (state: RootState) => state.article.articles;
export const selectArticle = (state: RootState) => state.article.article;

// Reducer
export default articleSlice.reducer;
