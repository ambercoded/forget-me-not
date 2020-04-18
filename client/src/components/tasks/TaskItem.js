import React, { Fragment } from "react";
import PropTypes from "prop-types";

const TaskItem = ({ task }) => {
  const { id, name, reward, quantity, isDone } = task;

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
        </span>
      </div>
    </Fragment>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
