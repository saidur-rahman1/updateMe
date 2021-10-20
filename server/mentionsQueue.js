const Queue = require('bull');
const reddit = require('./routes/reddit');

const mentionsQueue = new Queue('Mentions Queue');

mentionsQueue.add({}, { repeat: { cron: '35 9 * * *' } });

mentionsQueue.process(async (job, done) => {
    await reddit('Tesla');
    done();
});

