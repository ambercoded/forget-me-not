import React from "react";
import Tasks from "../tasks/Tasks";
import TaskForm from "../tasks/TaskForm";

const Home = () => {
  return (
    <div>
      <h1 className="text-center">Tasks</h1>
      <Tasks />
      <TaskForm></TaskForm>
    </div>
  );
};

export default Home;
