import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";

export const TodoList = (props) => {
  const { todoList, handleDeleteTodo } = props;

  return (
    <ul className={styles.list}>
      {todoList.map((todo) => (
        <li className={styles.todo} key={todo.id}>
          <span className={styles.task}>{todo.title}</span>
          <FontAwesomeIcon
            className={styles.far}
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
