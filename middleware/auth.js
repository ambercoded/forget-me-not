// this middleware will be used on all routes that shall not be publicly available and require authentification

const jwt = require("jsonwebtoken");
require("dotenv").config();

// export this function
module.exports = function (req, res, next) {
  // get token from header by using the key
  const token = req.header("x-auth-token");

  // check if there is no token
  if (!token) {
    return res.status(401).json({ msg: "No token. authentication denied." });
  }

  try {
    // after verification, the payload gets put into the variable "decoded"
    const decoded = jwt.verify(token, process.env.JWTSECRET);

    // retrieve the user object from the payload
    // make the "user" accessible inside of the route by saving the decoded user info in the req.user object
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid." });
  }
};
