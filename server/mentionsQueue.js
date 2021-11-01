const Queue = require('bull');
const reddit = require('./routes/reddit');

const mQueue = new Queue('Mentions Queue');

mQueue.process(async (job, done) => {
    await reddit(job.data.company);
    done();
});


function mentionsQueue(company) {
    mQueue.add({company});
}

module.exports = { mentionsQueue };

