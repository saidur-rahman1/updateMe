const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {

  try {
    
    const { name, email } = req.body;

    let user = await User.findOne({email: email});
    user.platforms.push(name);
    await user.save();

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
    
});

module.exports = router;
