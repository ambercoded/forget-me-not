const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
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
  async (req, res) => {
    // do something depending on the validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if errors exist
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // check if there is a user with that email
      let user = await User.findOne({ email });

      if (user) {
        // return if the user already exists
        return res.status(400).json({ msg: "user already exists" });
      }

      // create user if there is none yet
      user = new User({
        name,
        email,
        password,
      });

      // salt determines how hashed the pw is gonna be
      const salt = await bcrypt.genSalt(10);

      // hash the pw with the salt
      user.password = await bcrypt.hash(password, salt);

      // save the new user to the database
      await user.save();

      // define what we want to send back to the userin the auth token. we only need to send the user id bc that's enough to identify which contacts should be shown to the user after login
      const payload = {
        user: {
          id: user.id,
        },
      };

      // send back a json auth token to the user
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        // callback function that is called after the token has been signed
        (err, token) => {
          if (err) throw err; // if it goes wrong, throw error
          res.json({ token }); // if it works, send the token
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
