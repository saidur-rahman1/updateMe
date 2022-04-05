const express = require("express");
const router = express.Router();

const { Mention } = require("../models/mention");
const auth = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
  try {
        const {order, page, search} = req.query;
        const user = req.user;

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
          mentions.forEach((mention) => {
            if (mention.likes.includes(user.id)) {
              mention.likes = true;
            } else {
              mention.likes = false;
            }
          });
          res.json(mentions);
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

router.put("/like", auth, async (req, res) => {
  try {
        const queryData = req.body;
        const user = req.user;
        
        const mention = await Mention.findOne({_id: queryData.mentionId});
        const updateObj = !mention.likes.includes(user.id)
        ? { $push: { likes: user.id } }
        : { $pull: { likes: user.id } };
        await mention.updateOne(updateObj);
        res.sendStatus(204);


  } catch (error) {
    console.log(error);
  }
});

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
