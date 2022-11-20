import { all, fork } from "redux-saga/effects";

// saga list
import { aboutWatcherSaga } from "features/about/store/about.sagas";
import { userWatcherSaga } from "features/user/store/user.sagas";

export function* rootSaga() {
  // list of saga
  yield all([fork(aboutWatcherSaga), fork(userWatcherSaga)]);
}

export default rootSaga;
