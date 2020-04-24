import React, { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import TaskContext from "../../context/task/taskContext";
import RewardsContext from "../../context/rewards/rewardsContext";
import { Card, ContainerRow, Button, H4, Chip, HR } from "../../styles";

const TaskItem = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [changedTask, setChangedTask] = useState(task);

  const taskContext = useContext(TaskContext);
  const { deleteTask, updateTask } = taskContext;

  const rewardsContext = useContext(RewardsContext);
  const { addCoins, removeCoins } = rewardsContext;

  const { id, name, reward } = task;

  const onDelete = (e) => {
    deleteTask(id);
  };

  const onChange = (e) => {
    setChangedTask({ ...changedTask, [e.target.name]: e.target.value });
  };

  const onChangeNumberInput = (e) => {
    if (isNaN(e.target.value)) {
      // on older browsers, input type "number" might not be supported and strings or an empty string might be entered. this way any invalid number is saved as a 0.
      setChangedTask({ ...changedTask, [e.target.name]: 0 });
    } else {
      setChangedTask({
        ...changedTask,
        [e.target.name]: parseInt(e.target.value),
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    updateTask(changedTask);
  };

  const onDone = (e) => {
    // todo: make sure that the points are added only to the user who is logged in and not to a global score
    addCoins(reward);

    // PROBLEMATIC RACE CONDITION. updateTask should only be called after the the changedState has been set.
    setChangedTask({ ...changedTask, isDone: true });
    updateTask(changedTask);
  };

  const onUndo = (e) => {
    removeCoins(reward);
    setChangedTask({ ...changedTask, isDone: false });
    updateTask(changedTask);
  };

  if (editMode) {
    return (
      <Fragment>
        <form onSubmit={onSubmit}>
          <ContainerRow>
            {/* <label htmlFor="taskName">Task name</label> */}
            <input
              id="taskName"
              type="text"
              name="name"
              value={changedTask.name}
              onChange={onChange}
            />
            {/* <label htmlFor="reward">Coins as a reward</label> */}
            <input
              id="reward"
              type="text"
              name="reward"
              value={changedTask.reward || 0}
              onChange={onChangeNumberInput}
              style={{ width: "10vw" }}
            />
            <input
              type="submit"
              value="Save changes"
              className="btn btn-primary"
            />
            <Button
              type="button"
              className="btn"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
            <Button className="btn" onClick={onDelete}>
              <i className="fas fa-trash"></i>
            </Button>
          </ContainerRow>
        </form>
      </Fragment>
    );
  }

  if (task.isDone) {
    return (
      <Fragment>
        <Card>
          <ContainerRow style={{ marginRight: "auto" }}>
            <Button onClick={onUndo}>
              <i
                className="far fa-check-square"
                style={{ color: "lightgray" }}
              ></i>
            </Button>
            <H4
              className="text-primary text-left"
              style={{ textDecoration: "line-through", color: "lightgray" }}
            >
              {name}
            </H4>
          </ContainerRow>
        </Card>
        <HR />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Card>
        <ContainerRow style={{ marginRight: "auto" }}>
          <Button onClick={onDone}>
            <i className="far fa-square"></i>
          </Button>
          <H4 className="text-primary text-left">{name}</H4>
        </ContainerRow>
        <div style={{ marginLeft: "auto" }}>
          <Chip>+ {reward} coins</Chip>
          <Button onClick={() => setEditMode(true)}>
            <i className="fas fa-pen"></i>
          </Button>
        </div>
      </Card>
      <HR />
    </Fragment>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskItem;
