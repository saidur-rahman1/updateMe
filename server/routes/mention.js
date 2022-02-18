const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Mention } = require("../models/mention");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const order = req.query.order;
        const page = req.query.page;

        if (decodedToken) {
            const user = await User.findOne({_id: decodedToken.user});
            if (!user) return res.status(401).send("Invalid credentials/User not found");
            const skip = (page - 1) * 20; 
            let regCompany = []
            for (let i=0 ; i < user.company.length ; i++) {
              regCompany[i] = new RegExp(user.company[i], "i");
            }
            if (order === 'date') {
              const mentions = await Mention.find({
                $or: [
                  { content: { $in: regCompany } },
                  { title: { $in: regCompany } }
                ],
                $and: [
                  { platform: { $in: user.platforms } }
                ]
              }).sort({date: -1}).skip(skip).limit(20);
              res.json(mentions);
            } else {
              const mentions = await Mention.find({
                $or: [
                  { content: { $in: regCompany } },
                  { title: { $in: regCompany } }
                ],
                $and: [
                  { platform: { $in: user.platforms } }
                ]
              }).sort({popularity: -1}).skip(skip).limit(20);
              res.json(mentions);
            }
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
