import React, { useState, useContext } from "react";
import TaskContext from "../../context/task/taskContext";

const TaskForm = () => {
  const taskContext = useContext(TaskContext);

  const [task, setTask] = useState({
    name: "",
    isDone: false,
    reward: "",
  });

  const { name, isDone, reward } = task;

  const onChange = (e) => {
    // we have to copy the rest of the current state with the spread operator and then we can set whatever property has been changed by using e.target.name
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    taskContext.addTask(task); // pass in our state (all of our form fields)
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">Add Task</h2>
      <input
        type="text"
        placeholder="task name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="number"
        placeholder="number of coins as a reward"
        name="reward"
        value={reward}
        onChange={onChange}
      />
      <div>
        <input
          type="submit"
          value="Add Task"
          className="btn btn-primary btn-block"
        />
      </div>
    </form>
  );
};

export default TaskForm;
