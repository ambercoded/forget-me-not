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
  "/",
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
router.put("/:id", (req, res) => {
  res.send("Updating a task");
});

// @route     DELETE api/tasks/:id
// @desc      Delete a user's task
// @access    Private
router.delete("/:id", (req, res) => {
  res.send("Delete a task");
});

module.exports = router;
