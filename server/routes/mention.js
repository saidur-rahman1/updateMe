const express = require("express");
const router = express.Router();

const { Mention } = require("../models/mention");

router.get("/", async (req, res) => {
  try {
    const mention = await Mention.find();
    res.json(mention);
  } catch (error) {
    console.log(error);
  }
});

// Alternative way if not using the async/await and try/catch commands
// router.get("/", (req, res) => {
// Mention.find()
// .then(mention => res.json(mention))
// .catch(error => res.status(400).res.json(error));
// });

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mention = await Mention.findOne({_id: id});
    res.json(mention);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
