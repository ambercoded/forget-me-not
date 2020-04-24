import React from "react";
import Tasks from "../tasks/Tasks";
import TaskForm from "../tasks/TaskForm";
import TasksCompleted from "../tasks/TasksCompleted";

const Home = () => {
  return (
    <div>
      <h1 className="text-center">Tasks</h1>
      <TaskForm />
      <Tasks />
      <TasksCompleted />
    </div>
  );
};

export default Home;
