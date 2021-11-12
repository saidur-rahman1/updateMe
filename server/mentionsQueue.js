const Queue = require('bull');
const reddit = require('./routes/reddit');
const twitter = require('./routes/twitter');

const mQueue = new Queue('Mentions Queue');

mQueue.process(async (job, done) => {
    await reddit(job.data.company);
    await twitter(job.data.company);
    done();
});


function mentionsQueue(company) {
    mQueue.add({company});
}

module.exports = { mentionsQueue };

