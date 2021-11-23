const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { Mention, getMentions } = require("../models/mention");
const reddit = require("../routes/reddit");
const twitter = require("../routes/twitter");

router.post("/", async (req, res) => {

  try {
    
    const { email, company, password1, password2 } = req.body;

    if (!email || !company || !password1 || !password2) {
      return res.status(400).send("All required fields not complete");
    }
    
    let isValidEmail = (/$^|.+@.+..+/).test(email);
    if (!isValidEmail) return res.status(400).send("Invalid email");

    if (password1.length < 6) return res.status(400).send("Password should be at least 6 characters");

    if (password1 !== password2) return res.status(400).send("Passwords do not match");

    let user = await User.findOne({email: email});
    if (user) return res.status(400).send("Account already registered");

    await reddit(company);
    await twitter(company);

    user = new User({
      email: email,
      company: company,
      password: password1
    });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // let mention = new Mention({
    //   content: 'The new 16" Macbook is coming this October. This model is rumoured to come with the powerful M1X processor',
    //   title: 'Apple\'s 16" Macbook with M1X processor coming this fall - Facebook',
    //   platform: 'Facebook',
    //   image: 'image-apple16-facebook',
    //   date: new Date(),
    //   popularity: '1'
    // });
    // await mention.save();

    const token = jwt.sign(
      {
        user: user._id
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true
    }).status(201).send(user);

    //res.status(201).send(user);

  } catch (error) {
    console.log(error);
  }
    
});

module.exports = router;
