import { useCallback } from "react";

import {
  tagActions,
  selectIsLoading,
  selectFollowTags,
  selectAllTags,
} from "features/tag/store";
import { Tag, ToggleFollowTagFormInput } from "features/tag/types";
import { useAppDispatch, useAppSelector } from "store/hooks";

export type TagServiceOperators = {
  isLoading: boolean;
  followTags: Tag[];
  allTags: Tag[];
  getTags: () => void;
  toggleFollowTag: (form: ToggleFollowTagFormInput) => void;
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
    toggleFollowTag: useCallback(
      (form: ToggleFollowTagFormInput) => {
        dispatch(tagActions.toggleFollowTagRequest(form));
      },
      [dispatch]
    ),
  };
};

export default useTagService;
