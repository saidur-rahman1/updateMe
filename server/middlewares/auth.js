const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
    //try {
        const token = req.cookies.token;
        // if (!token) return res.status(401).json({ errorMessage: "Unauthorized" });

        // const verified = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = verified.user;

        if (!token) { 
            res.locals.auth = false;
        } else {
            jwt.verify(token, process.env.JWT_SECRET);
            res.locals.auth = true;
            next();
        }
    

    // } catch (error) {
    //     console.error(error);
    //     res.status(401).json({ errorMessage: "Unauthorized" });
    // }
});

module.exports = router;