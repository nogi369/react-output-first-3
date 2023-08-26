import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TodoList = (props) => {
  const { todoList } = props;

  return (
    <ul>
      {todoList.map((todo) => (
        <li key={todo.id}>
          <span>{todo.title}</span>
          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
        </li>
      ))}
    </ul>
  );
};
