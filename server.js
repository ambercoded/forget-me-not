const express = require("express");

// initialize express into a const app
const app = express();

app.get("/", (req, res) =>
  res.json({ msg: "Welcome to the Forget-Me-Not API" })
);

// Define routes
// Backend routes
// we have to require the files, because when they are called, it iwll look at those files
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/tasks", require("./routes/tasks"));

// in dev we will use :5000 and in prod, something else thats deefined in the env
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Guess what, Server started on port ${PORT}`)
);
