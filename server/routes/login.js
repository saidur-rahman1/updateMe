const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");

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

    const company = [...user.company];
    const platforms = [...user.platforms];

    const token = jwt.sign(
      {
        user: user._id
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true
    }).status(201).json({email, company, token, platforms});

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
  
});

module.exports = router;
