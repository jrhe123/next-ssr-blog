import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import counterReducer from "features/counter/counterSlice";

const middleware = [];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}
const enhancers = [...middleware];

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer },
    // middleware: enhancers,
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
