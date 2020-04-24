const mongoose = require("mongoose");
require("dotenv").config();
const db = process.env.MONGOURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected. yay!");
  } catch (err) {
    console.error(err.message);
    process.exit(1); // exit with failure = 1
  }
};

module.exports = connectDB;
