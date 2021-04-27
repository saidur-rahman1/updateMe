const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/updateMe')
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error("Could not connect to MongoDB", error));

router.get("/welcome", function (req, res, next) {
  res.status(200).send({ welcomeMessage: "Step 1 (completed)" });
});

module.exports = router;
