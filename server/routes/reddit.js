const axios = require('axios');
const { Mention } = require('../models/mention');

async function reddit(searchTerm) {
    try {
        const outcome = await axios.get(`http://www.reddit.com/search.json?q=${searchTerm}`);
        const results = outcome.data.data.children.map(data => data.data);
        results.forEach(element => {
            const elementImage = element.preview ? element.preview.images[0].source.url : 'https://c0.klipartz.com/pngpicture/612/982/gratis-png-logo-de-reddit-youtube-vestido.png';
            const elementContent = element.selftext ? element.selftext : 'No content';
            let mention = new Mention({
                content: elementContent,
                title: element.title,
                platform: 'Reddit',
                image: elementImage,
                date: new Date(),
                popularity: element.upvote_ratio
            });
            mention.save();
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = reddit;