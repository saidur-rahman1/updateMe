const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const reddit = require("../routes/reddit");
const twitter = require("../routes/twitter");

userRouter.get("/", async (req, res) => {

    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        if (decodedToken) {
            const user = await User.findOne({_id: decodedToken.user});

            if (!user) return res.status(401).send("Invalid credentials/User not found");
            const { email, company, platforms } = user;
            res.json({email, company, platforms});
        } else {
            res.json(false);
        }

    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

userRouter.put("/platform", async (req, res) => {

    try {
        const { token } = req.cookies;
        const fePlatforms = req.body;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        if (decodedToken) {
            const user = await User.findOne({_id: decodedToken.user});
            if (!user) return res.status(401).send("Invalid credentials/User not found");

            const updatedPlatforms = [];
            for (let platform in fePlatforms) {
                if ((fePlatforms[platform] === true) && (platform === 'reddit')) updatedPlatforms.push('Reddit');
                if ((fePlatforms[platform] === true) && (platform === 'twitter')) updatedPlatforms.push('Twitter');
                if ((fePlatforms[platform] === true) && (platform === 'bi')) updatedPlatforms.push('Business Insider');
            }
            
            user.platforms = updatedPlatforms;
            await user.save();
            const { email, company, platforms } = user;
            res.json({email, company, platforms});
        } else {
            res.json(false);
        }

    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

userRouter.put("/save", async (req, res) => {

    try {
        const { token } = req.cookies;
        const saveData = req.body;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        if (decodedToken) {
            const user = await User.findOne({_id: decodedToken.user});
            if (!user) return res.status(401).send("Invalid credentials/User not found");
            
            user.company = [...saveData.company];
            user.email = saveData.email;
            await user.save();

            let companyList = [...saveData.company]
            for (let i=0 ; i < companyList.length ; i++) {
                await reddit(companyList[i]);
                await twitter(companyList[i]);
            }

            const { email, company, platforms } = user;
            res.json({email, company, platforms});
        } else {
            res.json(false);
        }

    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

module.exports = userRouter;