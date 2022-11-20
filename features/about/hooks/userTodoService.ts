import { useCallback } from "react";

import { aboutActions, selectTodos } from "features/about/store";
import { Todo, TodoFormInput } from "features/about/types";
import { useAppDispatch, useAppSelector } from "store/hooks";

export type TodoServiceOperators = {
  todos: Todo[];
  createTodo: (data: TodoFormInput) => void;
};

/**
 * custom-hooks
 * @see https://reactjs.org/docs/hooks-custom.html
 */
export const useAboutService = (): Readonly<TodoServiceOperators> => {
  const dispatch = useAppDispatch();
  return {
    todos: useAppSelector(selectTodos),
    createTodo: useCallback(
      (todo: TodoFormInput) => {
        dispatch(aboutActions.create({ title: todo.title }));
      },
      [dispatch]
    ),
  };
};

export default useAboutService;
