const express = require("express");
const router = express.Router();

const { Mention } = require("../models/mention");

router.get("/", (req, res) => {

  try {
    Mention.find().then(mention => res.json(mention));
  } catch (error) {
    console.log(error);
  }
  
});

module.exports = router;
