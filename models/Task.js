const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
  // make sure that every task is related to certain user (and not available to all users)
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  reward: {
    type: Number,
    default: 10,
  },
});

module.exports = mongoose.model("task", TaskSchema);
