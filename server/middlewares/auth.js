const jwt = require("jsonwebtoken");
const User = require("../models/user");

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