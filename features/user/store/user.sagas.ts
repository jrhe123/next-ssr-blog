import { SagaIterator } from "@redux-saga/core";
import {
  call,
  put,
  delay,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import {
  getVerifyCode,
  signin,
  signout,
  getUserDetail,
  updateUserDetail,
} from "features/user/api";
import { userActions } from "features/user/store/user.slice";
import {
  VerifyCodeFormInput,
  SigninFormInput,
  UpdateProfileFormInput,
} from "features/user/types";
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

function* onSignout({
  payload,
}: {
  type: typeof userActions.signoutRequest;
  payload: void;
}): SagaIterator {
  const response = yield call(signout);
  if (response.code === 0) {
    message.success(response.message);
    yield put(userActions.signoutSucceeded());
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(userActions.signoutFailed(errors));
  }
}

function* onGetUserDetail({
  payload,
}: {
  type: typeof userActions.getUserDetailRequest;
  payload: void;
}): SagaIterator {
  const response = yield call(getUserDetail);
  if (response.code === 0) {
    yield put(userActions.getUserDetailSucceeded(response.data));
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(userActions.getUserDetailFailed(errors));
  }
}

function* onUpdateUserDetail({
  payload,
}: {
  type: typeof userActions.updateUserDetailRequest;
  payload: UpdateProfileFormInput;
}): SagaIterator {
  const response = yield call(updateUserDetail, payload);
  if (response.code === 0) {
    message.success(response.message);
    yield put(userActions.updateUserDetailSucceeded(response.data));
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(userActions.updateUserDetailFailed(errors));
  }
}

// Watcher Saga
export function* userWatcherSaga(): SagaIterator {
  yield takeEvery(userActions.getVerifyCodeRequest.type, onGetVerifyCode);
  yield takeEvery(userActions.signinRequest.type, onSignin);
  yield takeEvery(userActions.signoutRequest.type, onSignout);
  yield takeEvery(userActions.getUserDetailRequest.type, onGetUserDetail);
  yield takeEvery(userActions.updateUserDetailRequest.type, onUpdateUserDetail);
}

export default userWatcherSaga;
