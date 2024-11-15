const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    await mongoose
      .connect(process.env.MONGOURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected"))
      .catch((err) => console.log(err));
  } catch (err) {
    throw console.log(err.message);
  }
}

module.exports = connectDB;