const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Mention } = require("../models/mention");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        if (decodedToken) {
            const user = await User.findOne({_id: decodedToken.user});
            if (!user) return res.status(401).send("Invalid credentials/User not found");

            const mentions = await Mention.find({
              $or: [
                { content: new RegExp(user.company, "i") },
                { title: new RegExp(user.company, "i") }
              ],
              $and: [
                { platform: { $in: user.platforms } }
              ]
            });
            res.json(mentions);
            
        } else {
            res.json(false);
        }
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
