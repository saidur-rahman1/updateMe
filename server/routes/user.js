const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

const User = require("../models/user");

userRouter.get("/", async (req, res) => {

    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id: decodedToken.user});

        if (!user) return res.status(401).send("Invalid credentials/User not found");
        const { email, company } = user;
        res.json({email, company});
    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

module.exports = userRouter;