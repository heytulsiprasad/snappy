require("dotenv").config();

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");

// Middleware

// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routers/auth");
const userRoutes = require("./routers/user");

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

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
