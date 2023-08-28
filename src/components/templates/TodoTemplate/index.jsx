import { TodoList } from "../../organisms/TodoList";
import { AddTodo } from "../../organisms/AddTodo";
import { InputForm } from "../../atoms/InputForm";
import { useTodo } from "../../../hooks/useTodo";
import styles from "./styles.module.css";
// https://lorem-co-ltd.com/react-css/#:~:text=React%E3%81%A7CSS%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%9F%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%81%AE%E6%9B%B8%E3%81%8D%E6%96%B9

export const TodoTemplate = () => {
  const [
    { addInputValue, searchKeyword, showTodoList },
    {
      onChangeAddInputValue,
      handleAddTodo,
      handleDeleteTodo,
      handleChangeSearchKeyword,
    },
  ] = useTodo();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
        <AddTodo
          addInputValue={addInputValue}
          onChangeTodo={onChangeAddInputValue}
          handleAddTodo={handleAddTodo}
        />
      </section>
      <section className={styles.common}>
        <InputForm
          handleChangeValue={handleChangeSearchKeyword}
          inputValue={searchKeyword}
          placeholder={"Search Keyword"}
        />
      </section>
      <section className={styles.common}>
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
