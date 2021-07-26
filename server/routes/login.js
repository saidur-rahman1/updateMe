const express = require("express");
const router = express.Router();

const User = require("../models/user");

router.post("/login", function(req, res, next) {

  const { email, password } = req.body;

  async function checkUser() {
    try {
      const user = await User.find({email: email, password: password});
      if (!user) return res.status(400).send("Invalid credentials/User not found");
      res.status(201).send("Login successful");
    } catch (error) {
      console.log(error);
    }
  
  }

  checkUser();

});

module.exports = router;
