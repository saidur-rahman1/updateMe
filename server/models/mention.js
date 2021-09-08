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

async function getMentions (platform, company) {

    const regPlatform = new RegExp(platform, "i");
    const regCompany = new RegExp(company, "i");

    try {
        const mentions = await Mention
        .find({ platform: regPlatform })
        .or([
            {title: regCompany}, 
            {content: regCompany}
        ])
        .exec();
        console.log(mentions);
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { Mention, getMentions };