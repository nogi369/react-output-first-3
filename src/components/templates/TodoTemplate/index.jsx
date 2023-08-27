import { useState } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data";
import { TodoList } from "../../organisms/TodoList";
import { AddTodo } from "../../organisms/AddTodo";

export const TodoTemplate = () => {
  const [originTodoList, setOriginTodoList] = useState(INIT_TODO_LIST);
  const [addInputValue, setAddInputValue] = useState("");

  const onChangeAddInputValue = () => {};

  const handleAddTodo = () => {};

  const handleDeleteTodo = (targetId, targetTitle) => {
    // 「OK」時の処理開始 ＋ 確認ダイアログの表示
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId);

      setOriginTodoList(newTodoList);
    }
  };

  return (
    <>
      <h1>Todo List</h1>
      <AddTodo
        addInputValue={addInputValue}
        handleAddTodo={handleAddTodo}
        onChangeTodo={onChangeAddInputValue}
      />
      <TodoList todoList={originTodoList} handleDeleteTodo={handleDeleteTodo} />
    </>
  );
};
