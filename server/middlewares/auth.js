const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

// router.get("/", (req, res) => {
//     //try {
//         const token = req.cookies.token;
//         // if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

//         // const verified = jwt.verify(token, process.env.JWT_SECRET);
//         // req.user = verified.user;

//         if (!token) { 
//             return false;
//         } else {
//             jwt.verify(token, process.env.JWT_SECRET);
//             return true;
//         }
    

//     // } catch (error) {
//     //     console.error(error);
//     //     res.status(401).json({ errorMessage: "Unauthorized" });
//     // }
// });

async function auth (req, res, next) {
    const { token } = req.cookies;
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

    if (decodedToken) {
        const user = await User.findOne({_id: decodedToken.user});
        if (!user) return res.status(401).send("Invalid credentials/User not found");
        req.user = {
            id: user._id,
            company: user.company,
            platforms: user.platforms,
            email: user.email
        };
        next();
    } else {
        return res.status(401).send("Invalid credentials/User not found");
    }
}

module.exports = auth;