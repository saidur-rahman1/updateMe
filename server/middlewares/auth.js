const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    //try {
        const token = req.cookies.token;
        // if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        // const verified = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = verified.user;

        if (!token) { 
            return false;
        } else {
            jwt.verify(token, process.env.JWT_SECRET);
            return true;
        }
    

    // } catch (error) {
    //     console.error(error);
    //     res.status(401).json({ errorMessage: "Unauthorized" });
    // }
});

module.exports = router;