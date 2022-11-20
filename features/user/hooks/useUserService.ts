import { useCallback } from "react";

import { userActions, selectIsLoading, selectUser } from "features/user/store";
import {
  User,
  VerifyCodeFormInput,
  SigninFormInput,
} from "features/user/types";
import { useAppDispatch, useAppSelector } from "store/hooks";

export type UserServiceOperators = {
  isLoading: boolean;
  user: User | null;
  getVerifyCode: (data: VerifyCodeFormInput) => void;
  signin: (data: SigninFormInput) => void;
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
  };
};

export default useUserService;
