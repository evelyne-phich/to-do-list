import PropTypes from "prop-types";
import "./style.scss";

const List = ({ tasksList, onCheckedChange }) => (
  <ul className="list">
    {tasksList
      .sort((task1, task2) => {
        if (task1.done && !task2.done) {
          return 1;
        }
        if (!task1.done && task2.done) {
          return -1;
        }

        return 0;
      })
      .map((task) => (
        <li key={task.id}>
          <label
            className={task.done ? "list-item list-item--done" : "list-item"}
          >
            <input
              type="checkbox"
              onChange={() => {
                onCheckedChange(task.id);
              }}
              checked={task.done}
            />
            {task.label}
          </label>
        </li>
      ))}
  </ul>
);

List.propTypes = {
  tasksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default List;
