const mongoose = require('mongoose');

const Mention = mongoose.model('Mention', new mongoose.Schema({
    id: {
        type: String,
    },
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
        type: String
    },
    date: {
        type: Number,
        required: true
    },
    popularity: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    likes: {
        type: []
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
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = { Mention, getMentions };