const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {

  res.clearCookie("token").sendStatus(201);
  
});

module.exports = router;
