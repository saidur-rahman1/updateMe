const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/", async (req, res) => {

  try {
    
    const { firstName, lastName, email, password1, password2 } = req.body;

    if (!firstName || !lastName || !email || !password1 || !password2) {
      return res.status(400).send("All required fields not complete");
    }
    
    let isValidEmail = (/$^|.+@.+..+/).test(email);
    if (!isValidEmail) return res.status(400).send("Invalid email");

    if (password1.length < 6) return res.status(400).send("Password should be at least 6 characters");

    if (password1 !== password2) return res.status(400).send("Passwords do not match");

    let user = await User.findOne({email: email});
    if (user) return res.status(400).send("Account already registered");

    user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password1
    });
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.status(201).send(user);

  } catch (error) {
    console.log(error);
  }
    
});

module.exports = router;
