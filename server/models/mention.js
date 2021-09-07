const mongoose = require('mongoose');

const Mention = mongoose.model('Mention', new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    platform: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    popularity: {
        type: String,
        required: true
    }
}));

async function getMentions () {
    let qPlatform = 'facebook';
    let qCompany = 'apple';

    const regPlatform = `/.*${qPlatform}.*/i`;
    const regCompany = `/.*${qCompany}.*/i`;

    // /.*facebook.*/i
    // /.*apple.*/i

    try {
        const mentions = await Mention
        .find()
        .or([
            // {content: /.*{qPlatform}.*/i}, {content: /.*apple.*/i}
            {$and: [{title: /.*facebook.*/i}, {title: /.*apple.*/i}]}, 
            {$and: [{content: /.*facebook.*/i}, {content: /.*apple.*/i}]}
        ]);
        console.log(mentions);
    } catch (error) {
        console.log(error);
    }
    
}

//Mention.createIndexes({ platform: 1 });

module.exports = { Mention, getMentions };