const Queue = require('bull');
const reddit = require('./routes/reddit');

const mentionsQueue = new Queue('Mentions Queue');

mentionsQueue.process(async (job, done) => {
    await reddit(job.data.company);
    done();
});

function redditQueue (company) {

    mentionsQueue.add({ company }, { repeat: { cron: '*/1 * * * *' } });

}

module.exports = { redditQueue };

