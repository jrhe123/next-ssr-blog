import { all, fork } from "redux-saga/effects";

import { aboutWatcherSaga } from "features/about/store/about.sagas";

export function* rootSaga() {
  // list of saga
  yield all([fork(aboutWatcherSaga)]);
}

export default rootSaga;
