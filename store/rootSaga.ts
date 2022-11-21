import { all, fork } from "redux-saga/effects";

// saga list
import { userWatcherSaga } from "features/user/store/user.sagas";
import { articleWatcherSaga } from "features/article/store/article.sagas";

export function* rootSaga() {
  // list of saga
  yield all([fork(userWatcherSaga), fork(articleWatcherSaga)]);
}

export default rootSaga;
