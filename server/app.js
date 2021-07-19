const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const signupRouter = require("./routes/signup");
const User = require("./models/user");

const { json, urlencoded } = express;

var app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", signupRouter);
// app.use("/", indexRouter);
app.use("/ping", pingRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("Could not connect to MongoDB", error));

async function createUser() {
  try {
    let user = new User({
      firstName: 'first2',
      lastName: 'last2',
      email: 'first2.last2@test.com',
      password1: '123456',
      password2: '123456'
    });
    const result = await user.save();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  
}

createUser();

module.exports = app;
