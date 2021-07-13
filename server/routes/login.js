const express = require("express");
const router = express.Router();

// app.use(express.json());

router.post("/login", function(req, res, next) {
  //const teamName = req.body.teamName;
  const users = [
    {email: 'f1l1@test.com', password: '123456'}
  ];

  let email = req.body.email;
  let password = req.body.password;

//   if (
//     teamName &&
//     process.env.TEAM_MEMBERS &&
//     process.env.TEAM_MEMBERS.indexOf(teamName) >= 0
//   )
//     res.status(200).send({ response: `${teamName} is part of the team!` });
//   else
//     res.status(400).send({
//       response: `${teamName} is not part of the team. Modify your .env`
//     });
});

module.exports = router;
