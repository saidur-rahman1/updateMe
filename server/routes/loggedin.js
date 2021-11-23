const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {

    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);
        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    } catch (error) {
        console.error(error);
        res.json(false);
    }
  
});

module.exports = router;