import PropTypes from "prop-types";
import "./style.scss";
import ClearIcon from "../../assets/icons/ClearIcon";

const List = ({ tasksList, onCheckedChange, onClearIconClick }) => (
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
        <div key={task.id} className="task">
          <li>
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
          <ClearIcon
            className={"clearIcon"}
            onClick={() => {
              onClearIconClick(task.id);
            }}
          />
        </div>
      ))}
  </ul>
);

List.propTypes = {
  tasksList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onCheckedChange: PropTypes.func.isRequired,
};

export default List;
