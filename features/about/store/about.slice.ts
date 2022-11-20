// DUCKS pattern
import {
  createAction,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { Todo } from "features/about/types";
import type { RootState } from "store";

export interface AboutState {
  isLoading: boolean;
  todos: Todo[];
  errors?: Error[];
  message: string;
}

const initialState: AboutState = {
  isLoading: false,
  todos: [],
  errors: [],
  message: "",
};

// slice
export const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    fetchAllSucceeded(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        const nextState = {
          ...state, // use previous state
          message: "updated in HYDRATE",
        };
        return nextState;
      })
      .addDefaultCase((state, action) => {});
  },
});

// Actions
export const aboutActions = {
  create: createAction(`${aboutSlice.name}/create`, (todo: Todo) => ({
    payload: { id: nanoid(), title: todo.title },
  })),
  fetchAll: createAction(`${aboutSlice.name}/fetchAll`),
  fetchAllSucceeded: aboutSlice.actions.fetchAllSucceeded,
};

// Selectors
export const selectTodos = (state: RootState) => state.about.todos;

// Reducer
export default aboutSlice.reducer;
