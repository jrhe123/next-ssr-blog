import makeApi from "libs/core/configureAxios";

import { Tag, APIResponse, ToggleFollowTagFormInput } from "../types";

const api = makeApi("/");
const TAG_BASE_URL = `api/tag`;

export const getTagList = (): Promise<
  APIResponse<{
    followTags: Tag[];
    allTags: Tag[];
  }>
> => api.get(TAG_BASE_URL + "/get");

export const toggleFollowTag = (
  form: ToggleFollowTagFormInput
): Promise<APIResponse<void>> => api.post(TAG_BASE_URL + "/follow", form);
