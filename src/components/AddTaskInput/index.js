import PropTypes from "prop-types";
import "./style.scss";

const AddTaskInput = ({ inputText, onInputChange, onTaskSubmit }) => (
  <form
    className="form"
    onSubmit={(event) => {
      event.preventDefault();
      onTaskSubmit();
    }}
  >
    <input
      type="text"
      className="form-item"
      placeholder="Ajouter une tâche"
      value={inputText}
      onChange={(event) => {
        const text = event.target.value;
        onInputChange(text);
      }}
    />
  </form>
);

export default AddTaskInput;

AddTaskInput.propTypes = {
  inputText: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onTaskSubmit: PropTypes.func.isRequired,
};
