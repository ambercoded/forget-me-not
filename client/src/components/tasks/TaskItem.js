import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import TaskContext from "../../context/task/taskContext";

const TaskItem = ({ task }) => {
  const taskContext = useContext(TaskContext);

  const { id, name, reward, isDone } = task;

  const onDelete = (e) => {
    taskContext.deleteTask(id);
  };

  return (
    <Fragment>
      <div className="card container">
        <h3 className="text-primary text-left">{name}</h3>
        <span className="badge">+ {reward} coins</span>
        <span style={{ float: "right" }}>
          <button className="btn btn-success">
            Done <i className="fas fa-check"></i>
          </button>
          <button className="btn">
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
