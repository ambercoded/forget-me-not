import React, { Fragment, useContext, useState } from "react";
import PropTypes from "prop-types";
import TaskContext from "../../context/task/taskContext";
import RewardsContext from "../../context/rewards/rewardsContext";
import styled from "styled-components";

const Card = styled.div`
  /* border: 1px solid black; */
  /* background: lightblue; */
  display: flex;
  flex-direction: row;
  margin: 8px 0px;
  border-radius: 8px;
  /* box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2); */
  transition: 0.3s;
  /* &:hover {
    box-shadow: 0 0px 16px 0 rgba(0, 0, 0, 0.2);
  } */
`;

const Chip = styled.span`
  border-radius: 16px;
  background: limegreen;
  padding: 4px 16px;
  font-size: 14px;
  color: white;
`;

const ContainerRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  padding: 8px;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background: transparent;
  border: none;
  &:hover {
    background: lightblue;
  }
`;

const H4 = styled.h4`
  margin: 8px;
  color: black;
`;

const HR = styled.hr`
  border: 0.5px solid lightgray;
`;

const TaskItem = ({ task }) => {
  const [editMode, setEditMode] = useState(false);
  const [changedTask, setChangedTask] = useState(task);

  const taskContext = useContext(TaskContext);
  const { deleteTask, updateTask } = taskContext;

  const rewardsContext = useContext(RewardsContext);
  const { addCoins } = rewardsContext;

  const { id, name, reward } = task;

  const onDelete = (e) => {
    deleteTask(id);
  };

  const onChange = (e) => {
    setChangedTask({ ...changedTask, [e.target.name]: e.target.value });
  };

  const onChangeNumberInput = (e) => {
    if (isNaN(e.target.value)) {
      e.target.value.toString();
      // on older browsers, input type number might not be supported and strings might be entered. as a fallback just set the reward to 0 for now)
      setChangedTask({ ...changedTask, [e.target.name]: 0 });
      // TODO: show a form validation error client-side (only necessary in older browsers that dont implement input type "number")
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
    // give Points to the user who finished the task
    // todo: make sure that the points are added only to the user who is logged in and not to a global score
    addCoins(reward);

    // todo: instead of deleting, move the task to an archive (setIsDone to true and only display tasks in the tasks list that have "isDone" = false). on the archive only show the ones with isDone = true.
    deleteTask(id);
  };

  if (editMode) {
    return (
      <Fragment>
        <Card>
          <form onSubmit={onSubmit}>
            <label htmlFor="taskName">Task name</label>
            <input
              id="taskName"
              type="text"
              name="name"
              value={changedTask.name}
              onChange={onChange}
            />
            <label htmlFor="reward">Coins as a reward</label>
            <input
              id="reward"
              type="text"
              name="reward"
              value={changedTask.reward || 0}
              onChange={onChangeNumberInput}
            />
            <input
              type="submit"
              value="Save changes"
              className="btn btn-primary"
            />
            <button
              type="button"
              className="btn"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button className="btn" onClick={onDelete}>
              <i className="fas fa-trash"></i>
            </button>
          </form>
        </Card>
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
