import React, { useState, useContext } from "react";
import TaskContext from "../../context/task/taskContext";
import { ContainerRow, Button, TextInput } from "../../styles";

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
    <form onSubmit={onSubmit}>
      <ContainerRow style={{ flexWrap: "wrap", flex: 1 }}>
        <TextInput
          id="taskname"
          type="text"
          placeholder="What needs to be done?"
          name="name"
          value={name}
          onChange={onChange}
          style={{ display: "inline-block", minWidth: "300px", flex: 5 }}
        />
        <TextInput
          id="reward"
          type="text"
          placeholder="number of coins as a reward (e.g. 30)"
          name="reward"
          value={reward || 0}
          onChange={onChangeNumberInput}
          style={{
            minWidth: "75px",
            display: "inline-block",
            flex: 1,
          }}
        />
        <div>
          <Button
            type="submit"
            background="blue"
            color="white"
            style={{ flex: 2 }}
          >
            Add Task
          </Button>
        </div>
      </ContainerRow>
    </form>
  );
};

export default TaskForm;
