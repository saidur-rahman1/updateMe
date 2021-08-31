const express = require("express");
const router = express.Router();

const Mention = require("../models/mention");

router.get("/", async (req, res) => {

  try {

    const { contentSource } = req.body;

    let mention = await Mention.find({platform: contentSource});
    if (!mention) return res.status(400).send("No content available");

    let content = mention.content;
    let title = mention.title;
    let platform = mention.platform;
    let image = mention.image;
    let date = mention.date;
    let popularity = mention.popularity;

    res.status(201).send("Retrive successful");

  } catch (error) {
    console.log(error);
  }
    
});

module.exports = router;
