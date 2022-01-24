const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {

  try {
    
    const { name, email } = req.body;

    let user = await User.findOne({email: email});
    for( let i = 0; i < user.platforms.length; i++){   
        if (user.platforms[i] === name) { 
            user.platforms.splice(i, 1); 
            i--; 
        }
    }
    await user.save();

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
    
});

module.exports = router;
