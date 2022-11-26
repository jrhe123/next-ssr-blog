import { useCallback } from "react";

import {
  tagActions,
  selectIsLoading,
  selectFollowTags,
  selectAllTags,
} from "features/tag/store";
import { Tag } from "features/tag/types";
import { useAppDispatch, useAppSelector } from "store/hooks";

export type TagServiceOperators = {
  isLoading: boolean;
  followTags: Tag[];
  allTags: Tag[];
  getTags: () => void;
};

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useTagService = (): Readonly<TagServiceOperators> => {
  const dispatch = useAppDispatch();
  return {
    isLoading: useAppSelector(selectIsLoading),
    followTags: useAppSelector(selectFollowTags),
    allTags: useAppSelector(selectAllTags),
    getTags: useCallback(() => {
      dispatch(tagActions.getTagsRequest());
    }, [dispatch]),
  };
};

export default useTagService;
