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
import { getTagList } from "features/tag/api";
import { tagActions } from "features/tag/store/tag.slice";
import { Tag, APIResponse } from "features/tag/types";
// antd
import { message } from "antd";

// Worker Sagas
function* onGetTags({
  type,
}: {
  type: typeof tagActions.getTagsRequest;
}): SagaIterator {
  const response: APIResponse<{
    followTags: Tag[];
    allTags: Tag[];
  }> = yield call(getTagList);
  if (response.code === 0) {
    // action
    yield put(
      tagActions.getTagsSucceeded({
        followTags: response.data?.followTags || [],
        allTags: response.data?.allTags || [],
      })
    );
  } else {
    message.error(response.message || "API error");
    const errors = [new Error(response.message)];
    yield put(tagActions.getTagsFailed(errors));
  }
}

// Watcher Saga
export function* tagWatcherSaga(): SagaIterator {
  yield takeEvery(tagActions.getTagsRequest.type, onGetTags);
}

export default tagWatcherSaga;
