const express = require("express");
const router = express.Router();

//app.use(express.json());

const users = [
  {firstName: 'f1', lastName: 'l1', email: 'f1l1@test.com', password1: '123456', password2: '123456'}
];

router.post("/signup", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password1 = req.body.password1;
    let password2 = req.body.password2;
    if (firstName && lastName && email && password1 && password2) {
      let emailChecker = (/$^|.+@.+..+/).test(values.email);
      if (emailChecker) {
        if (password1.length() > 5) {
          
        } else {
          res.status(400).send("Password should be atleast 6 characters");
        }
      } else {
        res.status(400).send("Invalid email");
      }
    } else {
      res.status(400).send("All required fields not complete");
    }
    users.push(user);
    res.status(200).send("Registration successful");
    //if (!user) res.status(404).send("user not found");
    res.send(user);
});

module.exports = router;
