const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');

const User = require("../models/user");

router.post("/signup", async (req, res) => {
    const { firstName, lastName, email, password1, password2 } = req.body;
    let errorCheck = false;

    if (!firstName && !lastName && !email && !password1 && !password2) {
      errorCheck = true;
      return res.status(400).send("All required fields not complete");
    }
    
    let isValidEmail = (/$^|.+@.+..+/).test(values.email);
    if (!isValidEmail) {
      errorCheck = true;
      return res.status(400).send("Invalid email");
    }

    if (password1.length < 6) {
      errorCheck = true;
      return res.status(400).send("Password should be at least 6 characters");
    }

    let user = await User.findOne({email: email});
    if (user) {
      errorCheck = true;
      return res.status(400).send("Account already registered");
    }

    if (!errorCheck) {
      user = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password1
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      const result = await user.save();
      console.log(result);
      res.send(user);
      res.status(201).send("Registration successful");
    }
});

module.exports = router;
