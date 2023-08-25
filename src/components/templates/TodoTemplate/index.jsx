import { useState } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data";
import { TodoList } from "../../organisms/TodoList";

export const TodoTemplate = () => {
  const [originTodoList, setOriginTodoList] = useState(INIT_TODO_LIST);

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todoList={originTodoList} />
    </>
  );
};
