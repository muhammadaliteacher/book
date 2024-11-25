const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db/config.db");
const bookRouter = require("./router/books.routes");
const cookieParser = require("cookie-parser");
const authorRouter = require("./router/author.routes");
const authRouter = require("./router/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");
const multer = require("multer")
const path = require("path")

const app = express();

const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

connectDB();

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({storage: storage})

app.use("/images", express.static("upload/images"))

app.post("/upload", upload.single("img"), (req, res) => {
  res.json({
    success: 1,
    path: `http://localhost:4001/images/${req.file.filename}`
  })
})

/////////////////////// router
app.use(bookRouter);
app.use(authorRouter)
app.use(authRouter)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log("running: " + PORT);
});
