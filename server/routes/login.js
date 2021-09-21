const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");

const User = require("../models/user");
const reddit = require('./reddit');

router.post("/", async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("All required fields not complete");
    }

    const user = await User.findOne({email: email});
    if (!user) return res.status(401).send("Invalid credentials/User not found");

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) return res.status(401).send("Invalid credentials/User not found");

    const token = jwt.sign(
      {
        user: user._id
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(201).send("Login successful");

  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;
