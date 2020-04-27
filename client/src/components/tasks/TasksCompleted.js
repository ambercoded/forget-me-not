import React, { useContext, Fragment } from "react";
import TaskContext from "../../context/task/taskContext";
import TaskItem from "./TaskItem";
import { H2 } from "../../styles";

const TasksCompleted = () => {
  const taskContext = useContext(TaskContext); // access to all methods and variables inside of this state

  const { tasks } = taskContext;

  const finishedTasksArray = tasks.filter((task) => task.isDone === true);

  if (finishedTasksArray.length === 0) {
    return (
      <Fragment>
        <H2>Completed Tasks</H2>
        <h4 className="text-center my-3">
          You lazy shoe. You haven't completed any tasks yet. Go ahead and be a
          busy bee!
        </h4>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <H2>Completed Tasks</H2>
      {finishedTasksArray.map((task) => {
        return <TaskItem originalTask={task} key={task.id}></TaskItem>;
      })}
    </Fragment>
  );
};

export default TasksCompleted;
