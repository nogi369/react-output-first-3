import { useState } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data";
import { TodoList } from "../../organisms/TodoList";
import { AddTodo } from "../../organisms/AddTodo";
import { InputForm } from "../../atoms/InputForm";
import { searchTodo } from "../../../utils/todoLogic";

export const TodoTemplate = () => {
  // Todoリスト
  const [originTodoList, setOriginTodoList] = useState(INIT_TODO_LIST);
  // 入力値
  const [addInputValue, setAddInputValue] = useState("");
  // 一意のid
  const [uniqueId, setUniqueId] = useState(INIT_UNIQUE_ID);
  // 検索キーワード
  const [searchKeyword, setSearchKeyword] = useState("");
  // 表示用Todoリスト
  const [showTodoList, setShowTodoList] = useState(INIT_TODO_LIST);

  const updateShowTodoList = (newTodoList, Keyword) => {
    setShowTodoList(
      Keyword !== "" ? searchTodo(newTodoList, Keyword) : newTodoList,
    );
  };

  // 入力値の更新処理
  const onChangeAddInputValue = (e) => {
    setAddInputValue(e.target.value);
  };

  // Todo追加処理
  const handleAddTodo = (e) => {
    // Enterキーが押された かつ 入力値が空文字でないこと
    if (e.key === "Enter" && addInputValue !== "") {
      const nextUniqueId = uniqueId + 1;

      const newTodoList = [
        ...originTodoList,
        {
          id: nextUniqueId,
          title: addInputValue,
        },
      ];

      setOriginTodoList(newTodoList);
      updateShowTodoList(newTodoList, searchKeyword);

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
      updateShowTodoList(newTodoList, searchKeyword);
    }
  };

  const handleSearchTodo = (e) => {
    const Keyword = e.target.value; // 検索キーワードを変数「 Keyword 」として扱えるようにする
    setSearchKeyword(Keyword);

    updateShowTodoList(originTodoList, Keyword);
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
        {showTodoList.length > 0 && (
          <TodoList
            todoList={showTodoList}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </section>
    </div>
  );
};
