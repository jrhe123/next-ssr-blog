import { SagaIterator } from "@redux-saga/core";
import {
  call,
  put,
  delay,
  take,
  takeEvery,
  takeLatest,
  select,
} from "redux-saga/effects";
import { publishArticle } from "features/article/api";
import { articleActions } from "features/article/store/article.slice";
import { ArticleFormInput } from "features/article/types";
// antd
import { message } from "antd";
// route
import Router from "next/router";
import { selectUser, User } from "features/user";

// Worker Sagas
function* onPublishArticle({
  payload,
}: {
  type: typeof articleActions.publishArticleRequest;
  payload: ArticleFormInput;
}): SagaIterator {
  const response = yield call(publishArticle, payload);
  if (response.code === 0) {
    // get user selector
    const user: User = yield select(selectUser);
    // message
    message.success(response.message);
    // action
    yield put(articleActions.publishArticleSucceeded());
    // redirect to user profile page
    yield call(Router.push, `/user/${user.userId}`);
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(articleActions.publishArticleFailed(errors));
  }
}

// Watcher Saga
export function* articleWatcherSaga(): SagaIterator {
  yield takeEvery(articleActions.publishArticleRequest.type, onPublishArticle);
}

export default articleWatcherSaga;
