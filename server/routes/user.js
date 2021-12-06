const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const User = require("../models/user");

userRouter.post("/", async (req, res) => {

    try {
        let loggedIn = null;
        const token = req.cookies.token;
        if (token) {
            loggedIn = true;
        } else {
            loggedIn = false;
        }
        const { email } = req.body;
        const user = await User.findOne({email: email});
        if (!user) return res.status(401).send("Invalid credentials/User not found");
        // const token = req.cookies.token;
        const company = user.company;
        // if (!token) return res.json(false);
        // jwt.verify(token, process.env.JWT_SECRET);
        // res.send(true);
        // // console.log(res.locals.loggedIn);
        console.log("loggedIN: " + loggedIn);
        res.json({email, company, loggedIn});
    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

module.exports = userRouter;