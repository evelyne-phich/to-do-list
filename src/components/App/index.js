// == Import
import React from "react";
import "./styles.css";

import AddTaskInput from "../AddTaskInput";
import Counter from "../Counter";
import List from "../List";

import tasksArray from "../../data/tasks";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    tasksList: tasksArray,
  };

  componentDidMount() {
    const tasksList = localStorage.getItem("tasksList");

    if (!tasksList) {
      this.setState({
        tasksList: [],
      });
    } else {
      this.setState({
        tasksList: JSON.parse(tasksList),
      });
    }
  }

  componentDidUpdate() {
    const { tasksList } = this.state;

    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  }

  handleSubmitTask = (newTaskLabel) => {
    const { tasksList } = this.state;
    const tasksIdsList = tasksList.map((task) => task.id);
    const maxId = Math.max(...tasksIdsList);

    const newTask = {
      id: maxId + 1,
      label: newTaskLabel,
      done: false,
    };

    this.setState({
      tasksList: [newTask, ...tasksList],
    });
  };

  getCounter = () => {
    const { tasksList } = this.state;

    const tasksNotDoneList = tasksList.filter((task) => task.done === false);
    const numberOfTasksNotDone = tasksNotDoneList.length;

    return numberOfTasksNotDone;
  };

  handleCheckedChanged = (checkedTaskId) => {
    const { tasksList } = this.state;

    const foundTask = tasksList.find((task) => task.id === checkedTaskId);

    const filteredTasksList = tasksList.filter(
      (task) => task.id !== foundTask.id
    );

    foundTask.done = !foundTask.done;

    if (foundTask.done) {
      this.setState({
        tasksList: [...filteredTasksList, foundTask],
      });
    } else {
      this.setState({
        tasksList: [foundTask, ...filteredTasksList],
      });
    }
  };

  render() {
    const { tasksList } = this.state;

    return (
      <div className="app">
        <AddTaskInput onSubmitTask={this.handleSubmitTask} />
        <Counter counter={this.getCounter()} />
        <List
          tasksList={tasksList}
          onCheckedChange={this.handleCheckedChanged}
        />
      </div>
    );
  }
}

// == Export
export default App;
