import React, { useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskContext from "./taskContext";
import taskReducer from "./taskReducer";
import {
  ADD_TASK,
  DELETE_TASK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_TASK,
  // FILTER_TASK,
  // CLEAR_FILTER,
} from "../types";

const TaskState = (props) => {
  const initialState = {
    tasks: [
      {
        name: "Omis Account erstellen",
        isDone: false,
        reward: 30,
        id: "dbc95aeb-8eab-48a1-9535-3f2b058bb3b4",
      },
      {
        name: "Sim Karte aktivieren",
        isDone: false,
        reward: 30,
        id: "9922f448-33eb-43d1-9554-99968d054c13",
      },
      {
        name: "Alexa zurücksetzen und neuen Account nutzen",
        isDone: false,
        reward: 40,
        id: "68d3ef28-71f3-4934-851f-3ee9b74cde80",
      },
      {
        name: "iOS App damit verknüpfen (falls nötig?)",
        isDone: false,
        reward: 10,
        id: "ef6f745c-bfee-4e3c-ae37-1beeaeeab31c",
      },
      {
        name:
          "neue Simkarte in Router einlegen und neues Wifi nutzen mit Alexa",
        isDone: false,
        reward: 30,
        id: "9aad9f2a-5132-4116-8005-5ffb8e9b1adf",
      },
      {
        name: "im Webinterface neue Kontakte anlegen",
        isDone: false,
        reward: 50,
        id: "002e21a7-900c-4f67-9dd1-b3c90ea9ff1c",
      },
      {
        name: "amazon photos account erstellen für Omi",
        isDone: false,
        reward: 30,
        id: "f3d128d4-6596-4f38-8b99-8ec6a69b238d",
      },
    ],

    current: null,
  };

  // state allows us to access anything in our state. dispatch allows us to dispatch objects to our reducer
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // add task
  const addTask = (task) => {
    // for now, generate a random id
    task.id = uuidv4();
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
