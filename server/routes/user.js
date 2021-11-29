const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const User = require("../models/user");

userRouter.get("/", auth, (req, res) => {

    try {
        // const token = req.cookies.token;
        console.log(res.locals.auth);
        // if (!token) return res.json(false);
        // jwt.verify(token, process.env.JWT_SECRET);
        // res.send(true);
        // // console.log(res.locals.loggedIn);
        // // res.send(res.locals.loggedIn)
    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

module.exports = userRouter;