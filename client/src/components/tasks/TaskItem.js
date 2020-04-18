import React, { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import TaskContext from "../../context/task/taskContext";
import { STATES } from "mongoose";

const TaskItem = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [changedTask, setChangedTask] = useState(task);
  const taskContext = useContext(TaskContext);
  const { deleteTask, updateTask } = taskContext;

  const { id, name, reward, isDone } = task;

  const onDelete = (e) => {
    deleteTask(id);
  };

  const onChange = (e) => {
    setChangedTask({ ...changedTask, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    setEditMode(false);
    updateTask(changedTask);
  };

  const onDone = (e) => {
    // give Points to the user who finished the task
    deleteTask(id);
  };

  if (editMode) {
    return (
      <Fragment>
        <div className="card container">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="name"
              value={changedTask.name}
              onChange={onChange}
            />
            <input
              type="text"
              name="reward"
              value={changedTask.reward}
              onChange={onChange}
            />
            <input
              type="submit"
              value="Save changes"
              className="btn btn-primary"
            />
            <button className="btn" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="card container">
        <h3 className="text-primary text-left">{name}</h3>
        <span className="badge">+ {reward} coins</span>
        <span style={{ float: "right" }}>
          <button className="btn btn-success" onClick={onDone}>
            Done <i className="fas fa-check"></i>
          </button>
          <button className="btn" onClick={() => setEditMode(true)}>
            <i className="fas fa-pen"></i>
          </button>
          <button className="btn" onClick={onDelete}>
            <i className="fas fa-trash"></i>
          </button>
        </span>
      </div>
    </Fragment>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
