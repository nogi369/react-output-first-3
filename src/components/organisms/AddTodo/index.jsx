import { InputForm } from "../../atoms/InputForm";

export const AddTodo = (props) => {
  const { addInputValue, onChangeAddInputValue, handleAddTodo } = props;

  return (
    <InputForm
      placeholder={"New Todo"}
      inputValue={addInputValue}
      handleChangeValue={onChangeAddInputValue}
      handleKeyDown={handleAddTodo}
    />
  );
};
