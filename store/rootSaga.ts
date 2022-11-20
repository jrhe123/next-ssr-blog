import { all, fork } from "redux-saga/effects";

// saga list
import { userWatcherSaga } from "features/user/store/user.sagas";

export function* rootSaga() {
  // list of saga
  yield all([fork(userWatcherSaga)]);
}

export default rootSaga;
