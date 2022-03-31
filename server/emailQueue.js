const Queue = require('bull');
const User = require("./models/user");
const Mention = require("./models/mention");

const eQueue = new Queue('Email Queue');

eQueue.process(async (job, done) => {
    try {
        const users = await User.find();
        users.forEach( async (user) => {
            let regCompany = [];
            let order = 'date';
            for (let i=0 ; i < user.company.length ; i++) {
                regCompany[i] = new RegExp(user.company[i], "i");
            }
            let mentions = await Mention.find({
                $or: [
                    { content: { $in: regCompany } },
                    { title: { $in: regCompany } }
                ],
                $and: [
                    {platform: { $in: user.platforms }}
                ]
            }).sort({[order]: -1}).limit(10);
            
            sendEmail.sendWeeklySummary(user.email, mentions);
        });
        done();    
    } catch(err) {
        console.error(err);
    }
});

function emailQueue () {

    const MONDAY_AT_9_00_AM = '0 9 * * MON';
    eQueue.add({}, { repeat: { cron: MONDAY_AT_9_00_AM } });

}

module.exports = { emailQueue };