// DUCKS pattern
import {
  createAction,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import {
  SigninFormInput,
  User,
  VerifyCodeFormInput,
} from "features/user/types";
import type { RootState } from "store";

export interface UserState {
  isLoading: boolean;
  user: User | null;
  errors?: Error[];
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  errors: [],
};

// slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // verify code
    getVerifyCodeRequest(state, action: PayloadAction<VerifyCodeFormInput>) {
      state.isLoading = true;
      state.errors = [];
    },
    getVerifyCodeSucceeded(state) {
      state.isLoading = false;
    },
    getVerifyCodeFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // signin
    signinRequest(state, action: PayloadAction<SigninFormInput>) {
      state.isLoading = true;
      state.user = null;
      state.errors = [];
    },
    signinSucceeded(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.user = action.payload;
    },
    signinFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
  },
});

// Actions
export const userActions = {
  getVerifyCodeRequest: userSlice.actions.getVerifyCodeRequest,
  getVerifyCodeSucceeded: userSlice.actions.getVerifyCodeSucceeded,
  getVerifyCodeFailed: userSlice.actions.getVerifyCodeFailed,
  signinRequest: userSlice.actions.signinRequest,
  signinSucceeded: userSlice.actions.signinSucceeded,
  signinFailed: userSlice.actions.signinFailed,
};

// Selectors
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUser = (state: RootState) => state.user.user;

// Reducer
export default userSlice.reducer;
