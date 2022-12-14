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
  UpdateProfileFormInput,
} from "features/user/types";
import type { RootState } from "store";

export interface UserState {
  isLoading: boolean;
  user: User | null;
  profile: User | null;
  errors?: Error[];
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  profile: null,
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
    // sign out
    signoutRequest(state) {
      state.isLoading = true;
      state.errors = [];
    },
    signoutSucceeded(state) {
      state.isLoading = false;
      state.user = null;
    },
    signoutFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.errors = action.payload;
    },
    // get user detail
    getUserDetailRequest(state) {
      state.isLoading = true;
      state.errors = [];
    },
    getUserDetailSucceeded(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.profile = action.payload;
    },
    getUserDetailFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.profile = null;
      state.errors = action.payload;
    },
    // update user detail
    updateUserDetailRequest(
      state,
      action: PayloadAction<UpdateProfileFormInput>
    ) {
      state.isLoading = true;
      state.errors = [];
    },
    updateUserDetailSucceeded(state, action: PayloadAction<User>) {
      state.isLoading = false;
      state.profile = action.payload;
    },
    updateUserDetailFailed(state, action: PayloadAction<Error[]>) {
      state.isLoading = false;
      state.profile = null;
      state.errors = action.payload;
    },
    // fetch user
    fetchUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        // use user info from cookie as initial values
        const {
          payload: {
            user: { user },
          },
        } = action as any;
        const cookieUser: User = user;
        const nextState = {
          ...state,
        };
        if (cookieUser.userId) {
          nextState.user = cookieUser;
        }
        return nextState;
      })
      .addDefaultCase((state, action) => {});
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
  signoutRequest: userSlice.actions.signoutRequest,
  signoutSucceeded: userSlice.actions.signoutSucceeded,
  signoutFailed: userSlice.actions.signoutFailed,
  getUserDetailRequest: userSlice.actions.getUserDetailRequest,
  getUserDetailSucceeded: userSlice.actions.getUserDetailSucceeded,
  getUserDetailFailed: userSlice.actions.getUserDetailFailed,
  updateUserDetailRequest: userSlice.actions.updateUserDetailRequest,
  updateUserDetailSucceeded: userSlice.actions.updateUserDetailSucceeded,
  updateUserDetailFailed: userSlice.actions.updateUserDetailFailed,
  //
  fetchUser: userSlice.actions.fetchUser,
};

// Selectors
export const selectIsLoading = (state: RootState) => state.user.isLoading;
export const selectUser = (state: RootState) => state.user.user;
export const selectProfile = (state: RootState) => state.user.profile;

// Reducer
export default userSlice.reducer;
