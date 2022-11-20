import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
// logger
import logger from "redux-logger";

// list of reducers
import userReducer from "features/user/store/user.slice";
// saga
import { rootSaga } from "store/rootSaga";

const makeStore = () => {
  //
  const sagaMiddleware = createSagaMiddleware();
  const middlewares: any[] = [sagaMiddleware];
  if (process.env.NODE_ENV !== "production") middlewares.push(logger);
  //
  const store = configureStore({
    reducer: {
      user: userReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
        middlewares
      ),
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

// store
export const store = makeStore();
export const wrapper = createWrapper(makeStore, { debug: true });

// types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
