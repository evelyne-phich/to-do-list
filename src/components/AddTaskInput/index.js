import "./style.scss";

const AddTaskInput = ({ onSubmitTask }) => (
  <form
    className="form"
    onSubmit={(event) => {
      event.preventDefault();
      const newTaskLabel = event.target[0].value;
      onSubmitTask(newTaskLabel);
    }}
  >
    <input type="text" className="form-item" placeholder="Ajouter une tâche" />
  </form>
);

export default AddTaskInput;
