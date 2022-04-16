const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// DB
const mongoose = require("mongoose");

// DB URI
const DB_URI =
  "mongodb+srv://admin:ID5N8gqaWL33PzjH@cluster0.ipkja.mongodb.net/test-inventory?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || DB_URI;

mongoose.connect(mongoDB, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// Routes
const indexRouter = require("./routes/index");
const itemRouter = require("./routes/items");
const categoryRouter = require("./routes/categories");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/catalog", itemRouter);
app.use("/categories", categoryRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
