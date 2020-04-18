import React, { useReducer } from "react";
import uuid from "uuid/v4";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  ADD_TASK,
  DELETE_TASK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TASK,
  FILTER_TASK,
  CLEAR_FILTER,
} from "../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        id: 1,
        name: "Wäsche waschen",
        reward: 50,
        isDone: false,
        quantity: 1,
      },
      {
        id: 2,
        name: "Einkaufen gehen (14 Artikel)",
        reward: 140,
        isDone: false,
        quantity: 1,
      },
      {
        id: 3,
        name: "Die Wohnung saugen",
        reward: 100,
        isDone: false,
        quantity: 1,
      },
    ],
    current: null,
  };

  // state allows us to access anything in our state. dispatch allows us to dispatch objects to our reducer
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // add task
  const addTask = (task) => {
    // for now, generate a random id
    task.id = uuid();
    dispatch({ type: ADD_TASK, payload: task });
  };

  // delete task
  const deleteTask = (id) => {
    dispatch({ type: DELETE_TASK, payload: id });
  };

  // update task
  const updateTask = (task) => {
    dispatch({ type: UPDATE_TASK, payload: task });
  };

  // set current task
  const setCurrent = (task) => {
    dispatch({ type: SET_CURRENT, payload: task });
  };

  // clear current task
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // filter tasks

  // clear filter

  // return our provider, so that we can wrap our whole application in this context
  // anything we want to access from other components, goes into "value" of the provider
  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        current: state.current,
        addTask,
        updateTask,
        deleteTask,
        setCurrent,
        clearCurrent,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};

export default TaskState;
