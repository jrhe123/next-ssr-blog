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
import {
  publishArticle,
  updateArticle,
  publishComment,
  getArticle,
} from "features/article/api";
import { articleActions } from "features/article/store/article.slice";
import {
  ArticleFormInput,
  CommentFormInput,
  GetArticleFormInput,
} from "features/article/types";
// antd
import { message } from "antd";
// route
import Router from "next/router";
import { selectUser, User } from "features/user";
import { selectArticle, Article, Comment } from "features/article";

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

function* onUpdateArticle({
  payload,
}: {
  type: typeof articleActions.updateArticleRequest;
  payload: ArticleFormInput;
}): SagaIterator {
  const response = yield call(updateArticle, payload);
  if (response.code === 0) {
    // get article selector
    const article: Article = yield select(selectArticle);
    // message
    message.success(response.message);
    // action
    yield put(articleActions.updateArticleSucceeded());
    // redirect to article detail page
    yield call(Router.push, `/article/${article.id}`);
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(articleActions.updateArticleFailed(errors));
  }
}

function* onPublishComment({
  payload,
}: {
  type: typeof articleActions.publishCommentRequest;
  payload: CommentFormInput;
}): SagaIterator {
  const response = yield call(publishComment, payload);
  if (response.code === 0) {
    // message
    message.success(response.message);
    // action
    yield put(articleActions.publishCommentSucceeded(response.data));
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(articleActions.publishCommentFailed(errors));
  }
}

function* onGetArticle({
  payload,
}: {
  type: typeof articleActions.getArticleRequest;
  payload: GetArticleFormInput;
}): SagaIterator {
  const response = yield call(getArticle, payload);
  if (response.code === 0) {
    // action
    yield put(articleActions.getArticleSucceeded(response.data));
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(articleActions.getArticleFailed(errors));
  }
}

// Watcher Saga
export function* articleWatcherSaga(): SagaIterator {
  yield takeEvery(articleActions.publishArticleRequest.type, onPublishArticle);
  yield takeEvery(articleActions.updateArticleRequest.type, onUpdateArticle);
  yield takeEvery(articleActions.publishCommentRequest.type, onPublishComment);
  yield takeEvery(articleActions.getArticleRequest.type, onGetArticle);
}

export default articleWatcherSaga;
