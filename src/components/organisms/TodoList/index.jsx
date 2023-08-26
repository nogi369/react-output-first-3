import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TodoList = (props) => {
  const { todoList, handleDeleteTodo } = props;

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="lg"
            onClick={() => {
              handleDeleteTodo(todo.id, todo.title);
            }}
          />
        </li>
      ))}
    </ul>
  );
};
