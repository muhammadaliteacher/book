const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/config.db");
const bookRouter = require("./router/books.routes");
const cookieParser = require("cookie-parser");
const authorRouter = require("./router/author.routes");

const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));


connectDB();

/////////////////////// router
app.use(bookRouter);
app.use(authorRouter)

app.listen(PORT, () => {
  console.log("running: " + PORT);
});
