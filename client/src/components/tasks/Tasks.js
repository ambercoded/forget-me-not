import React, { useContext, Fragment } from "react";
import TaskContext from "../../context/task/taskContext";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const taskContext = useContext(TaskContext); // access to all methods and variables inside of this state

  const { tasks } = taskContext;

  const unfinishedTasksArray = tasks.filter((task) => task.isDone === false);

  if (unfinishedTasksArray.length === 0) {
    return (
      <h4 className="text-center my-3">No tasks? Go ahead and add a task.</h4>
    );
  }

  return (
    <Fragment>
      {unfinishedTasksArray.map((task) => {
        return <TaskItem originalTask={task} key={task.id}></TaskItem>;
      })}
    </Fragment>
  );
};

export default Tasks;
