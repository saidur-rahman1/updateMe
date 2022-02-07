const axios = require('axios');
const { Mention } = require('../models/mention');

async function reddit(searchTerm) {
    try {
        const outcome = await axios.get(`http://www.reddit.com/search.json?q=${searchTerm}`);
        const results = outcome.data.data.children.map(data => data.data);
        results.forEach( async (element) => {
            //const elementImage = element.preview ? element.preview.images[0].source.url : 'https://www.howtogeek.com/wp-content/uploads/2019/12/Reddit-Karma-Header.jpg?height=200p&trim=2,2,2,2';
            let elementImage = 'https://www.howtogeek.com/wp-content/uploads/2019/12/Reddit-Karma-Header.jpg?height=200p&trim=2,2,2,2';
            const containsImage = element.thumbnail;
            if (containsImage.includes('.jpg') || containsImage.includes('.png')) elementImage = element.thumbnail;
            const elementContent = element.selftext ? element.selftext : 'No content';
            let mention = new Mention({
                content: elementContent,
                title: element.title,
                platform: 'Reddit',
                image: elementImage,
                date: element.created_utc,
                popularity: element.ups,
                url: element.url
            });
            let findMention = await Mention.findOne({content: mention.content, title: mention.title, platform: mention.platform});
            if (!findMention) {
                mention.save();
            }
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = reddit;