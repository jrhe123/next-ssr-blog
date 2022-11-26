import makeApi from "libs/core/configureAxios";

import { Tag, APIResponse } from "../types";

const api = makeApi("/");
const TAG_BASE_URL = `api/tag`;

export const getTagList = (): Promise<
  APIResponse<{
    followTags: Tag[];
    allTags: Tag[];
  }>
> => api.get(TAG_BASE_URL + "/get");
