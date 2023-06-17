require("dotenv").config({ path: "../.env" });

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
// const multer = require("multer");

// Middleware
app.use(helmet()); // helmet helps secure Express apps by setting HTTP response headers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Set loggger middleware
if (process.env.NODE_ENV !== "production") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Routes
const authRoutes = require("./routers/auth");
const userRoutes = require("./routers/user");
const profileRoutes = require("./routers/profile");
const tweetRoutes = require("./routers/tweets");

// // Storage
// const Storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     // cb(err, filename)
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage: Storage,
// }).single("testImage");

// Connect to database
const db =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_PROD_URI
    : process.env.MONGO_DEV_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((e) => {
    console.log(e);
  });

// Routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/tweets", tweetRoutes);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../dist"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// module.exports = { upload };
