const express = require("express");
const router = express.Router();

const { Mention } = require("../models/mention");

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    const mention = await Mention.findOne({_id: id});
    res.status(201).json(mention);
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
