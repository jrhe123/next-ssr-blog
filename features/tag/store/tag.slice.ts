// DUCKS pattern
import {
  createAction,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { Tag, ToggleFollowTagFormInput } from "features/tag/types";
import type { RootState } from "store";

export interface TagState {
  isLoading: boolean;
  followTags: Tag[];
  allTags: Tag[];
  errors?: Error[];
}

const initialState: TagState = {
  isLoading: false,
  followTags: [],
  allTags: [],
  errors: [],
};

// slice
export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    // get tags
    getTagsRequest(state) {
      state.isLoading = true;
      state.errors = [];
    },
    getTagsSucceeded(
      state,
      action: PayloadAction<{
        followTags: Tag[];
        allTags: Tag[];
      }>
    ) {
      state.isLoading = false;
      state.followTags = action.payload.followTags;
      state.allTags = action.payload.allTags;
    },
    getTagsFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // toggle follow tag
    toggleFollowTagRequest(
      state,
      action: PayloadAction<ToggleFollowTagFormInput>
    ) {
      state.isLoading = true;
      state.errors = [];
    },
    toggleFollowTagSucceeded(
      state,
      action: PayloadAction<{
        followTags: Tag[];
        allTags: Tag[];
      }>
    ) {
      state.isLoading = false;
      state.followTags = action.payload.followTags;
      state.allTags = action.payload.allTags;
    },
    toggleFollowTagFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        const nextState = {
          ...state,
        };
        return nextState;
      })
      .addDefaultCase((state, action) => {});
  },
});

// Actions
export const tagActions = {
  // get tags
  getTagsRequest: tagSlice.actions.getTagsRequest,
  getTagsSucceeded: tagSlice.actions.getTagsSucceeded,
  getTagsFailed: tagSlice.actions.getTagsFailed,
  // toggle tag
  toggleFollowTagRequest: tagSlice.actions.toggleFollowTagRequest,
  toggleFollowTagSucceeded: tagSlice.actions.toggleFollowTagSucceeded,
  toggleFollowTagFailed: tagSlice.actions.toggleFollowTagFailed,
};

// Selectors
export const selectIsLoading = (state: RootState) => state.tag.isLoading;
export const selectFollowTags = (state: RootState) => state.tag.followTags;
export const selectAllTags = (state: RootState) => state.tag.allTags;

// Reducer
export default tagSlice.reducer;
