import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from ".";

// dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
// selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
