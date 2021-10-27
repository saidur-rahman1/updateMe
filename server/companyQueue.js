// const Queue = require('bull');
// const User = require("./models/user");

// function companyQueue () {

//     const companyQueue = new Queue('Company Queue');
//     var companies = '';

//     companyQueue.process(async (job, done) => {
//         companies = await User.distinct("company");
//         return companies;
//         //done();
//     });

//     companyQueue.add({}, { repeat: { cron: '*/5 * * * *' } });

// }

// module.exports = { companyQueue };

// module.exports = async function (job) {
// let companies = await User.distinct("company");
//     return companies;
// }