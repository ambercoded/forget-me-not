import React, { useState, useContext } from "react";
import TaskContext from "../../context/task/taskContext";

const TaskForm = () => {
  const taskContext = useContext(TaskContext);

  const [task, setTask] = useState({
    name: "",
    isDone: false,
    reward: 10,
  });

  const { name, reward } = task;

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const onChangeNumberInput = (e) => {
    if (isNaN(e.target.value) || null) {
      // on older browsers, input type number might not be supported and strings might be entered. as a fallback just set the reward to 0 for now)
      setTask({ ...task, [e.target.name]: 0 });
      // TODO: show a form validation error client-side (only necessary in older browsers that dont implement input type "number") and dont setstate then yet.
    } else {
      // if it is a number
      setTask({ ...task, [e.target.name]: parseInt(e.target.value) });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    taskContext.addTask(task); // pass in our state (all of our form fields)
    setTask({ name: "", isDone: false, reward: 10 });
  };

  return (
    <div className="card">
      <form onSubmit={onSubmit}>
        <h2 className="text-primary">Add Task</h2>
        <label htmlFor="taskname">Task name</label>
        <input
          id="taskname"
          type="text"
          placeholder="What needs to be done?"
          name="name"
          value={name}
          onChange={onChange}
        />
        <label htmlFor="reward">Coins as a reward</label>
        <input
          id="reward"
          type="text"
          placeholder="number of coins as a reward (e.g. 30)"
          name="reward"
          value={reward || 0}
          onChange={onChangeNumberInput}
        />
        <div>
          <input
            type="submit"
            value="Add Task"
            className="btn btn-primary btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
