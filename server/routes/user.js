const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const reddit = require("../routes/reddit");
const twitter = require("../routes/twitter");
const auth = require("../middlewares/auth");

userRouter.get("/", auth, async (req, res) => {

    try {
        // const { token } = req.cookies;
        // const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        // if (decodedToken) {
        //     const user = await User.findOne({_id: decodedToken.user});

        //     if (!user) return res.status(401).send("Invalid credentials/User not found");
        //     const { email, company, platforms } = user;
        //     res.json({email, company, platforms});
        // } else {
        //     res.json(false);
        // }
        const { email, company, platforms } = req.user;
        res.json({email, company, platforms});

    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

userRouter.put("/platform", auth, async (req, res) => {

    try {
        // const { token } = req.cookies;
        
        // const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        // if (decodedToken) {
        //     const user = await User.findOne({_id: decodedToken.user});
        //     if (!user) return res.status(401).send("Invalid credentials/User not found");

        //     const updatedPlatforms = [];
        //     for (let platform in fePlatforms) {
        //         if ((fePlatforms[platform] === true) && (platform === 'reddit')) updatedPlatforms.push('Reddit');
        //         if ((fePlatforms[platform] === true) && (platform === 'twitter')) updatedPlatforms.push('Twitter');
        //         if ((fePlatforms[platform] === true) && (platform === 'bi')) updatedPlatforms.push('Business Insider');
        //     }
            
        //     user.platforms = updatedPlatforms;
        //     await user.save();
        //     const { platforms } = user;
        //     res.json({platforms});
        // } else {
        //     res.json(false);
        // }

        const fePlatforms = req.body;
        const user = req.user;

        const updatedPlatforms = [];
        for (let platform in fePlatforms) {
            if ((fePlatforms[platform] === true) && (platform === 'reddit')) updatedPlatforms.push('Reddit');
            if ((fePlatforms[platform] === true) && (platform === 'twitter')) updatedPlatforms.push('Twitter');
            if ((fePlatforms[platform] === true) && (platform === 'bi')) updatedPlatforms.push('Business Insider');
        }
            
        user.platforms = updatedPlatforms;
        //await user.save();
        await User.findOneAndUpdate({ _id: user.id }, user);
        const { platforms } = user;
        res.json({platforms});

    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

userRouter.put("/save", auth, async (req, res) => {

    try {
        // const { token } = req.cookies;
        
        // const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        // if (decodedToken) {
        //     const user = await User.findOne({_id: decodedToken.user});
        //     if (!user) return res.status(401).send("Invalid credentials/User not found");
            
            
        // } else {
        //     res.json(false);
        // }

        const saveData = req.body;
        const user = req.user;

        user.company = [...saveData.company];
        user.email = saveData.email;
        await User.findOneAndUpdate({ _id: user.id }, user);
        //await user.save();

        let companyList = [...saveData.company]
        for (let company of companyList) {
            await reddit(company);
            await twitter(company);
        }

        const { email, company, platforms } = user;
        res.json({email, company, platforms});

    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

module.exports = userRouter;