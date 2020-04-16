const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// when creating routes, we dont do "app." anymore, but use "router"

// @route     POST api/users
// @desc      Register a user
// @access    Public
router.post(
  "/",
  [
    // set the checks
    check("name", "Please add a name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters."
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    // do something depending on the validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if errors exist
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("passed");
  }
);

module.exports = router;
