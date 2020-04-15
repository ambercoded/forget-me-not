// CRUD functionality and some reference which task belongs to which user

const express = require("express");
const router = express.Router();

// when creating routes, we dont do "app." anymore, but use router

// @route     GET api/tasks
// @desc      Get list of the user's tasks
// @access    Private
router.get("/", (req, res) => {
  res.send("Getting the tasks of the logged in user");
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
