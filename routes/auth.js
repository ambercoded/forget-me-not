const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

// when creating routes, we dont do "app." anymore, but use router

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password").exists(),
  ],
  async (req, res) => {
    // check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // if errors exist
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // retrieve the user for the given email
      let user = await User.findOne({ email });

      // if the user does not exist, return an error
      if (!user) {
        return res.status(400).json({ msg: "Invalid email or password." });
      }

      // compare the hashed entered password to the password of the user with that email
      const isMatch = await bcrypt.compare(password, user.password);

      //// if NOT same > show error that its wrong pw or username
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid email or password." });
      }

      //// else login (retrieve auth token)
      // define what we want to send back to the userin the auth token. we only need to send the user id bc that's enough to identify which contacts should be shown to the user after login
      const payload = {
        user: {
          id: user.id,
        },
      };

      // send back a json auth token to the user
      jwt.sign(
        payload,
        process.env.JWTSECRET,
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
      res.status(500).json({ msg: "Server error" });
    }
  }
);

module.exports = router;
