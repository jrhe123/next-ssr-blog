import { useCallback } from "react";

import {
  userActions,
  selectIsLoading,
  selectUser,
  selectProfile,
} from "features/user/store";
import {
  User,
  VerifyCodeFormInput,
  SigninFormInput,
  UpdateProfileFormInput,
} from "features/user/types";
import { useAppDispatch, useAppSelector } from "store/hooks";

export type UserServiceOperators = {
  isLoading: boolean;
  user: User | null;
  profile: User | null;
  getVerifyCode: (data: VerifyCodeFormInput) => void;
  signin: (data: SigninFormInput) => void;
  signout: () => void;
  getUserDetail: () => void;
  updateUserDetail: (data: UpdateProfileFormInput) => void;
  //
  fetchUser: (date: User) => void;
};

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useUserService = (): Readonly<UserServiceOperators> => {
  const dispatch = useAppDispatch();
  return {
    isLoading: useAppSelector(selectIsLoading),
    user: useAppSelector(selectUser),
    profile: useAppSelector(selectProfile),
    getVerifyCode: useCallback(
      (form: VerifyCodeFormInput) => {
        dispatch(userActions.getVerifyCodeRequest(form));
      },
      [dispatch]
    ),
    signin: useCallback(
      (form: SigninFormInput) => {
        dispatch(userActions.signinRequest(form));
      },
      [dispatch]
    ),
    signout: useCallback(() => {
      dispatch(userActions.signoutRequest());
    }, [dispatch]),
    getUserDetail: useCallback(() => {
      dispatch(userActions.getUserDetailRequest());
    }, [dispatch]),
    updateUserDetail: useCallback(
      (form: UpdateProfileFormInput) => {
        dispatch(userActions.updateUserDetailRequest(form));
      },
      [dispatch]
    ),
    //
    fetchUser: useCallback(
      (user: User) => {
        dispatch(userActions.fetchUser(user));
      },
      [dispatch]
    ),
  };
};

export default useUserService;
