const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

userRouter.get("/", async (req, res) => {

    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        if (decodedToken) {
            const user = await User.findOne({_id: decodedToken.user});

            if (!user) return res.status(401).send("Invalid credentials/User not found");
            const { email, company } = user;
            res.json({email, company});
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
        const { reddit, twitter, bi } = req.body;
        const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

        if (decodedToken) {
            const user = await User.findOne({_id: decodedToken.user});
            if (!user) return res.status(401).send("Invalid credentials/User not found");

            if (reddit) {
                user.platforms.push('Reddit');
            } else {
                for( let i = 0; i < user.platforms.length; i++){   
                    if (user.platforms[i] === 'Reddit') { 
                        user.platforms.splice(i, 1); 
                        i--; 
                    }
                }
            }

            if (twitter) {
                user.platforms.push('Twitter');
            } else {
                for( let i = 0; i < user.platforms.length; i++){   
                    if (user.platforms[i] === 'Twitter') { 
                        user.platforms.splice(i, 1); 
                        i--; 
                    }
                }
            }

            if (bi) {
                user.platforms.push('Business Insider');
            } else {
                for( let i = 0; i < user.platforms.length; i++){   
                    if (user.platforms[i] === 'Business Insider') { 
                        user.platforms.splice(i, 1); 
                        i--; 
                    }
                }
            }
            console.log(reddit);
            console.log(twitter);
            console.log(bi);
            await user.save();
            res.sendStatus(204);

        } else {
            res.json(false);
        }

    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

module.exports = userRouter;