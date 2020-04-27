import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import TaskContext from "../../context/task/taskContext";
import RewardsContext from "../../context/rewards/rewardsContext";
import { Card, ContainerRow, Button, Chip, HR, TextInput } from "../../styles";

const TaskItem = ({ originalTask }) => {
  const [task, setTask] = useState(originalTask);
  const [draftTask, setDraftTask] = useState(task);
  const [editMode, setEditMode] = useState(false);
  const { deleteTask, updateTask } = useContext(TaskContext);
  const { addCoins, removeCoins } = useContext(RewardsContext);
  const { id, name, reward } = originalTask;

  useEffect(() => {
    updateTask(task);
    // eslint-disable-next-line
  }, [task]);

  useEffect(() => {
    document.addEventListener("keydown", cancelEditModeOnEsc, false);
    return () => {
      document.removeEventListener("keydown", cancelEditModeOnEsc, false);
    };
  }, []);

  const onDelete = (e) => {
    deleteTask(id);
  };

  // editmode eventhandler
  const onChange = (e) => {
    setDraftTask({ ...draftTask, [e.target.name]: e.target.value });
  };

  // editmode eventhandler for numerical input fields
  const onChangeNumberInput = (e) => {
    if (isNaN(e.target.value)) {
      // on older browsers, input type "number" might not be supported and strings or an empty string might be entered. this way any invalid number is saved as a 0.
      setDraftTask({ ...draftTask, [e.target.name]: 0 });
    } else {
      setDraftTask({
        ...draftTask,
        [e.target.name]: parseInt(e.target.value),
      });
    }
  };

  const onSaveChanges = (e) => {
    e.preventDefault();
    setEditMode(false);
    setTask(draftTask);
  };

  const cancelEditModeOnEsc = (e) => {
    if (e.keyCode === 27) {
      setEditMode(false);
    }
  };

  const markAsDone = (e) => {
    // todo: make sure that the points are added only to the user who is logged in and not to a global score
    addCoins(reward);
    setTask({ ...task, isDone: true });
  };

  const markAsUndone = (e) => {
    removeCoins(reward);
    setTask({ ...task, isDone: false });
  };

  if (editMode) {
    return (
      <>
        <form onSubmit={onSaveChanges}>
          <ContainerRow style={{ flex: 1, flexWrap: "wrap" }}>
            <span>
              <label htmlFor="taskName">Task name</label>
              <TextInput
                id="taskName"
                type="text"
                name="name"
                value={draftTask.name}
                style={{ minWidth: "300px", display: "block" }}
                onChange={onChange}
              />
            </span>
            <span>
              <label htmlFor="reward">Coins as a reward</label>
              <TextInput
                id="reward"
                type="text"
                name="reward"
                value={draftTask.reward || 0}
                onChange={onChangeNumberInput}
                style={{ width: "125px", display: "block" }}
              />
            </span>
          </ContainerRow>
          <ContainerRow>
            <Button
              type="submit"
              value="Add Task"
              className="btn btn-primary btn-block"
              background="blue"
              color="white"
            >
              Save changes
            </Button>
            <Button
              type="button"
              className="btn"
              onClick={() => setEditMode(false)}
              background="transparent"
            >
              Cancel
            </Button>
            <Button className="btn" onClick={onDelete}>
              <i className="fas fa-trash"></i>
            </Button>
          </ContainerRow>
        </form>
      </>
    );
  }

  if (originalTask.isDone) {
    return (
      <>
        <Card>
          <ContainerRow
            style={{ minWidth: "auto", maxWidth: "600px", marginRight: "auto" }}
          >
            <Button onClick={markAsUndone}>
              <i
                className="far fa-check-square"
                style={{ color: "lightgray" }}
              ></i>
            </Button>
            <p
              className="text-primary text-left"
              style={{
                textDecoration: "line-through",
                color: "lightgray",
                paddingTop: "10px",
              }}
            >
              {name}
            </p>
          </ContainerRow>
          <div style={{ marginLeft: "auto" }}>
            <p style={{ color: "lightgray", fontSize: "14px" }}>
              <em>Adrian received {reward} coins</em>
            </p>
          </div>
        </Card>
        <HR />
      </>
    );
  }

  return (
    <>
      <Card onDoubleClick={() => setEditMode(true)}>
        <ContainerRow
          style={{
            minWidth: "auto",
            maxWidth: "600px",
            marginRight: "auto",
          }}
        >
          <Button onClick={markAsDone}>
            <i className="far fa-square"></i>
          </Button>
          <p
            className="text-primary text-left"
            style={{ display: "inline-block", paddingTop: "10px" }}
          >
            {name}
          </p>
        </ContainerRow>
        <div
          style={{ minWidth: "auto", maxWidth: "600px", marginLeft: "auto" }}
        >
          <Chip background="limegreen">+ {reward} coins</Chip>
          <Button onClick={() => setEditMode(true)}>
            <i className="fas fa-pen"></i>
          </Button>
        </div>
      </Card>
      <HR />
    </>
  );
};

TaskItem.propTypes = {
  originalTask: PropTypes.object.isRequired,
};

export default TaskItem;
