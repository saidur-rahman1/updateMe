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

    cQueue.add({}, { repeat: { cron: '45 2 * * *' } });

}

module.exports = { companyQueue };