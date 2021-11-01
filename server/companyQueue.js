const Queue = require('bull');
const User = require("./models/user");
const { mentionsQueue } = require('./mentionsQueue');

const cQueue = new Queue('Company Queue');

cQueue.process(async (job, done) => {
    try {
        const companies = await User.distinct("company");
        companies.forEach(company => mentionsQueue(company));
        done();    
    } catch(err) {
        console.error(err);
    }
});

function companyQueue () {

    const DAILY_AT_8_45_AM = '45 8 * * *';
    cQueue.add({}, { repeat: { cron: DAILY_AT_8_45_AM } });

}

module.exports = { companyQueue };