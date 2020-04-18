import React, { useContext, Fragment } from "react";
import TaskContext from "../../context/task/taskContext";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const taskContext = useContext(TaskContext); // access to all methods and variables inside of this state

  const { tasks } = taskContext;

  return (
    <Fragment>
      {tasks.map((task) => {
        return <TaskItem task={task} key={task.id}></TaskItem>;
      })}
    </Fragment>
  );
};

export default Tasks;
