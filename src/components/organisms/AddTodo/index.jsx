import { InputForm } from "../../atoms/InputForm";

export const AddTodo = (props) => {
  const { addInputValue, onChangeTodo, handleAddTodo } = props;

  return (
    <InputForm
      placeholder={"New Todo"}
      inputValue={addInputValue}
      handleChangeValue={onChangeTodo}
      handleKeyDown={handleAddTodo}
    />
  );
};
