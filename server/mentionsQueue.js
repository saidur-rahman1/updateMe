const Queue = require('bull');
const reddit = require('./routes/reddit');
const User = require("./models/user");


function redditQueue() {

    const mentionsQueue = new Queue('Mentions Queue');

    mentionsQueue.process(async (job, done) => {
        let companies = await User.distinct("company");
        for (let i=0 ; i<companies.length ; i++) {
            await reddit(companies[i]);
        }
        done();
    });

    mentionsQueue.add({}, { repeat: { cron: '*/5 * * * *' } });
    
}

module.exports = { redditQueue };

