const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  }).status(201).send("Log out successful");
  
});

module.exports = router;
