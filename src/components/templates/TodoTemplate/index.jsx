import { useState } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data";
import { TodoList } from "../../organisms/TodoList";
import { AddTodo } from "../../organisms/AddTodo";
import { InputForm } from "../../atoms/InputForm";

export const TodoTemplate = () => {
  // Todoリスト
  const [originTodoList, setOriginTodoList] = useState(INIT_TODO_LIST);
  // 入力値
  const [addInputValue, setAddInputValue] = useState("");
  // 一意のid
  const [uniqueId, setUniqueId] = useState(INIT_UNIQUE_ID);
  // 検索キーワード
  const [searchKeyword, setSearchKeyword] = useState("");

  // 入力値の更新処理
  const onChangeAddInputValue = (e) => {
    setAddInputValue(e.target.value);
  };
  // console.log(addInputValue);

  // Todo追加処理
  const handleAddTodo = (e) => {
    // Enterキーが押された かつ 入力値が空文字でないこと
    if (e.key === "Enter" && addInputValue !== "") {
      const nextUniqueId = uniqueId + 1;

      const newTodo = [
        ...originTodoList,
        {
          id: nextUniqueId,
          title: addInputValue,
        },
      ];

      setOriginTodoList(newTodo);
      setUniqueId(nextUniqueId);
      setAddInputValue("");
    }
  };

  // Todo削除処理
  const handleDeleteTodo = (targetId, targetTitle) => {
    // 「OK」時の処理開始 ＋ 確認ダイアログの表示
    if (window.confirm(`「${targetTitle}」のtodoを削除しますか？`)) {
      const newTodoList = originTodoList.filter((todo) => todo.id !== targetId);

      setOriginTodoList(newTodoList);
    }
  };

  const handleSearchTodo = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <section>
        <AddTodo
          addInputValue={addInputValue}
          onChangeTodo={onChangeAddInputValue}
          handleAddTodo={handleAddTodo}
        />
      </section>
      <section>
        <InputForm
          handleChangeValue={handleSearchTodo}
          inputValue={searchKeyword}
          placeholder={"Search Keyword"}
        />
      </section>
      <section>
        <TodoList
          todoList={originTodoList}
          handleDeleteTodo={handleDeleteTodo}
        />
      </section>
    </div>
  );
};
