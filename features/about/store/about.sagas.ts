import { SagaIterator } from "@redux-saga/core";
import {
  call,
  put,
  delay,
  take,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import { createTodo, getTodos } from "features/about/api";
import { aboutActions } from "features/about/store/about.slice";
import { Todo } from "features/about/types";

// Worker Sagas
export function* onGetTodos(): SagaIterator {
  const todos: Todo[] = yield call(getTodos);
  yield put(aboutActions.fetchAllSucceeded(todos));
}

function* onCreateTodo({
  payload,
}: {
  type: typeof aboutActions.create;
  payload: Todo;
}): SagaIterator {
  yield call(createTodo, payload);
  yield put(aboutActions.fetchAll());
}

// Watcher Saga
export function* aboutWatcherSaga(): SagaIterator {
  yield takeLatest(aboutActions.fetchAll.type, onGetTodos);
  yield takeEvery(aboutActions.create.type, onCreateTodo);
}

export default aboutWatcherSaga;
