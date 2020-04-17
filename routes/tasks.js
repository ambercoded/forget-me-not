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
router.post("/", (req, res) => {
  res.send("Adding a task");
});

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
