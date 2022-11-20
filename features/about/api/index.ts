import makeApi from "libs/core/configureAxios";

import { Todo } from "../types";

const api = makeApi("/");
const TODO_BASE_URL = `/todos`;

export const getTodos = (): Promise<Todo[]> => api.get(TODO_BASE_URL);
export const createTodo = (todo: Todo): Promise<Todo> =>
  api.post(TODO_BASE_URL, todo);
