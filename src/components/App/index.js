// == Import
import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

import AddTaskInput from "../AddTaskInput";
import Counter from "../Counter";
import List from "../List";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    tasksList: [],
    inputText: "",
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

  handleInputChange = (text) => {
    this.setState({ inputText: text });
  };

  handleTaskSubmit = () => {
    const { tasksList, inputText } = this.state;

    if (inputText) {
      const newTask = {
        id: uuidv4(),
        label: inputText,
        done: false,
      };

      this.setState({
        tasksList: [newTask, ...tasksList],
        inputText: "",
      });
    }
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

  handleClearIconClick = (taskIdToDelete) => {
    const { tasksList } = this.state;

    const filteredTasksList = tasksList.filter(
      (task) => task.id !== taskIdToDelete
    );

    this.setState({
      tasksList: [...filteredTasksList],
    });
  };

  render() {
    const { tasksList, inputText } = this.state;

    return (
      <div className="app">
        <h1 className="title">To-do list</h1>
        <AddTaskInput
          inputText={inputText}
          onInputChange={this.handleInputChange}
          onTaskSubmit={this.handleTaskSubmit}
        />
        <Counter counter={this.getCounter()} />
        <List
          tasksList={tasksList}
          onCheckedChange={this.handleCheckedChanged}
          onClearIconClick={this.handleClearIconClick}
        />
      </div>
    );
  }
}

// == Export
export default App;
