import { all, fork } from "redux-saga/effects";

// saga list
import { userWatcherSaga } from "features/user/store/user.sagas";
import { articleWatcherSaga } from "features/article/store/article.sagas";
import { tagWatcherSaga } from "features/tag/store/tag.sagas";

export function* rootSaga() {
  // list of saga
  yield all([
    fork(userWatcherSaga),
    fork(articleWatcherSaga),
    fork(tagWatcherSaga),
  ]);
}

export default rootSaga;
