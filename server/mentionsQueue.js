const Queue = require('bull');
const reddit = require('./routes/reddit');

function redditQueue (company) {

    const mentionsQueue = new Queue('Mentions Queue');

    mentionsQueue.process(async (job, done) => {
        await reddit(company);
        done();
    });

    mentionsQueue.add({}, { repeat: { cron: '*/1 * * * *' } });

}

module.exports = { redditQueue };

