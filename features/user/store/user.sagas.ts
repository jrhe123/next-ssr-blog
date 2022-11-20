import { SagaIterator } from "@redux-saga/core";
import {
  call,
  put,
  delay,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { getVerifyCode, signin } from "features/user/api";
import { userActions } from "features/user/store/user.slice";
import { VerifyCodeFormInput, SigninFormInput } from "features/user/types";
// antd
import { message } from "antd";

// Worker Sagas
function* onGetVerifyCode({
  payload,
}: {
  type: typeof userActions.getVerifyCodeRequest;
  payload: VerifyCodeFormInput;
}): SagaIterator {
  const response = yield call(getVerifyCode, payload);
  if (response.code === 0) {
    message.success("Code sent");
    yield put(userActions.getVerifyCodeSucceeded());
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(userActions.getVerifyCodeFailed(errors));
  }
}

function* onSignin({
  payload,
}: {
  type: typeof userActions.signinRequest;
  payload: SigninFormInput;
}): SagaIterator {
  const response = yield call(signin, payload);
  if (response.code === 0) {
    message.success(response.message);
    yield put(userActions.signinSucceeded(response.data));
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(userActions.signinFailed(errors));
  }
}

// Watcher Saga
export function* userWatcherSaga(): SagaIterator {
  yield takeEvery(userActions.getVerifyCodeRequest.type, onGetVerifyCode);
  yield takeEvery(userActions.signinRequest.type, onSignin);
}

export default userWatcherSaga;
