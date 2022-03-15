const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const { Mention } = require("../models/mention");
const User = require("../models/user");

router.get("/", async (req, res) => {
  try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const {order, page, search} = req.query;

        if (decodedToken) {
            const user = await User.findOne({_id: decodedToken.user});
            if (!user) return res.status(401).send("Invalid credentials/User not found");
            const MAX_MENTIONS_PER_PAGE = 20;
            const skip = (page - 1) * MAX_MENTIONS_PER_PAGE; 
            let regCompany = []
            let trimSearch = '';
            for (let i=0 ; i < user.company.length ; i++) {
              regCompany[i] = new RegExp(user.company[i], "i");
            }
            if (search) trimSearch = search.trim();
            if (trimSearch) {
              const regSearch = new RegExp(trimSearch, "i");
              const mentions = await Mention.find({
                $or: [
                  { content: { $in: regCompany } },
                  { title: { $in: regCompany } },
                ],
                $and: [
                  {platform: { $in: user.platforms }},
                  {$or: [{ content: { $in: regSearch } }, { title: { $in: regSearch } }]}
                ]
              }).sort({[order]: -1}).skip(skip).limit(MAX_MENTIONS_PER_PAGE);
              res.json(mentions);
            } else {
              const mentions = await Mention.find({
                $or: [
                  { content: { $in: regCompany } },
                  { title: { $in: regCompany } }
                ],
                $and: [
                  {platform: { $in: user.platforms }}
                ]
              }).sort({[order]: -1}).skip(skip).limit(MAX_MENTIONS_PER_PAGE);
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

router.put("/like", async (req, res) => {
  try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);
        const {mentionId} = req.query;

        if (decodedToken) {
          const mention = await Mention.findOne({_id: mentionId});
          if (!mention.likes.includes(decodedToken.user)) {
            await mention.updateOne({ $push: { likes: decodedToken.user } });
            res.status(200).json("liked");
          } else {
            const index = mention.likes.indexOf(decodedToken.user);
            mention.likes.splice(index, 1);
            await mention.save();
            res.status(200).json("unliked");
          }
        } else {
            res.json(false);
        }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
