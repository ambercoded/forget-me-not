// CRUD functionality and some reference which task belongs to which user
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Task = require("../models/Task");

// when creating routes, we dont do "app." anymore, but use router

// @route     GET api/tasks
// @desc      Get list of the user's tasks
// @access    Private
router.get("/", auth, async (req, res) => {
  // Pull all tasks for the given user from our database.
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route     POST api/tasks
// @desc      Add a task
// @access    Private
router.post(
  "/:id ",
  [
    auth,
    [
      check("name", "Please provide a task name.").not().isEmpty(),
      // check(
      //   "quantity",
      //   "Please enter a valid number for the quantity."
      // ).isNumeric(),
      // check("reward", "Please enter a reward that is at least 0 points").isInt({
      //   gt: 0,
      // }),
    ],
  ],
  async (req, res) => {
    // catch validation errors, if any
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // get the users input
    const { name, quantity, reward } = req.body;

    try {
      // create the task object
      const newTask = new Task({
        user: req.user.id,
        name,
        quantity,
        isDone: false,
        reward,
      });

      // save the new task to the db
      const task = await newTask.save();

      // send the new task to the user
      res.json(task);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route     PUT api/tasks/:id
// @desc      Update a task
// @access    Private
router.put("/:id", auth, async (req, res) => {
  // get user input
  const { name, quantity, reward, isDone } = req.body;

  // Build task object
  const taskFields = {};
  if (name) taskFields.name = name;
  if (quantity) taskFields.quantity = quantity;
  if (reward) taskFields.reward = reward;
  if (isDone) taskFields.isDone = isDone;

  try {
    let task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).send("no task with that id could be found");

    // make sure user owns the specified task
    if (task.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "Not authorized to edit this task." });

    // update the task in the db
    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: taskFields },
      { new: true }
    ); // if task doesnt exist, just create it

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route     DELETE api/tasks/:id
// @desc      Delete a user's task
// @access    Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task)
      return res.status(404).send("No task with that id could be found");

    // make sure user owns the specified task
    if (task.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: "Not authorized to delete this task." });

    // delete the task from the db
    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
