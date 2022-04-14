const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const reddit = require("../routes/reddit");
const twitter = require("../routes/twitter");
const sendEmail = require("../email");

router.post("/", async (req, res) => {

  try {
    
    const { email, password1, password2 } = req.body;
    let company = req.body.company;

    if (!email || !company || !password1 || !password2) {
      return res.status(400).send("All required fields not complete");
    }
    
    let isValidEmail = (/$^|.+@.+..+/).test(email);
    if (!isValidEmail) return res.status(400).send("Invalid email");

    if (password1.length < 6) return res.status(400).send("Password should be at least 6 characters");

    if (password1 !== password2) return res.status(400).send("Passwords do not match");

    let user = await User.findOne({email: email});
    if (user) return res.status(400).send("Account already registered");

    let platforms = ["Reddit", "Twitter", "Business Insider"];
    let companyList = [company];

    await reddit(company);
    await twitter(company);

    user = new User({
      email: email,
      company: companyList,
      password: password1,
      platforms: platforms
    });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = jwt.sign(
      {
        user: user._id
      },
      process.env.JWT_SECRET
    );

    company = companyList;

    res.cookie("token", token, {
      httpOnly: true
    }).status(201).json({email, company, token, platforms});

    sendEmail.sendWelcome(email);

  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
    
});

module.exports = router;
