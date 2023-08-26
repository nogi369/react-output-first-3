import { useState } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data";
import { TodoList } from "../../organisms/TodoList";

export const TodoTemplate = () => {
  const [originTodoList, setOriginTodoList] = useState(INIT_TODO_LIST);

  const handleDeleteTodo = (targetId, targetTitle) => {
    // 「OK」時の処理開始 ＋ 確認ダイアログの表示
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId)

      setOriginTodoList(newTodoList);
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      <TodoList todoList={originTodoList} handleDeleteTodo={handleDeleteTodo} />
    </>
  );
};
