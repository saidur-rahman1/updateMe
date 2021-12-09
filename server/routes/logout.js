const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  // console.log("res " + res.map());
  // console.log("res email " + res.data.email );
  res.clearCookie("token").sendStatus(201);
  
});

module.exports = router;
