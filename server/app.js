const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require('mongoose');
const cors = require('cors');
const { companyQueue } = require ('./companyQueue');
const { emailQueue } = require ('./emailQueue');
const { Server } = require("socket.io");
const http = require("http");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const mentionRouter = require("./routes/mention");
const logoutRouter = require("./routes/logout");
const userRouter = require("./routes/user");

const { json, urlencoded } = express;

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.header('origin'));
  next();
});

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));
app.use(cors({
  origin: ["http://localhost:3000/"],
  credentials: true
}));

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/mention", mentionRouter);
app.use("/logout", logoutRouter);
app.use("/user", userRouter);

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

// Connect to MongoDB
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("Could not connect to MongoDB", error));

// Initial Socket.io
const server = http.createServer(app);
const io = new Server(server, { cors: {
  origin: "http://localhost:3000",
}, });

// Run the cron job
companyQueue();
emailQueue();

module.exports = {app, server, io};
