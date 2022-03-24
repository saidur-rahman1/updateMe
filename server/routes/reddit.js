const axios = require('axios');
const { Mention } = require('../models/mention');
const { sentiment } = require('../models/sentiment');

async function reddit(searchTerm) {
    try {
        const outcome = await axios.get(`http://www.reddit.com/search.json?q=${searchTerm}`);
        const results = outcome.data.data.children.map(data => data.data);
        results.forEach( async (element) => {
            try {
                const currentSentiment = (sentiment(element.text));
                //const elementImage = element.preview ? element.preview.images[0].source.url : 'https://www.howtogeek.com/wp-content/uploads/2019/12/Reddit-Karma-Header.jpg?height=200p&trim=2,2,2,2';
                let elementImage = 'https://www.howtogeek.com/wp-content/uploads/2019/12/Reddit-Karma-Header.jpg?height=200p&trim=2,2,2,2';
                const containsImage = element.thumbnail;
                if (containsImage.includes('.jpg') || containsImage.includes('.png')) elementImage = element.thumbnail;
                const elementContent = element.selftext ? element.selftext : 'No content';
                await Mention.findOneAndUpdate({id: element.id, platform: 'Reddit'}, 
                    {
                        id: element.id,
                        content: elementContent,
                        title: element.title,
                        platform: 'Reddit',
                        image: elementImage,
                        date: element.created_utc,
                        popularity: element.ups,
                        url: element.url,
                        sentiment: currentSentiment[0],
                        emoji: currentSentiment[1]
                    }, 
                { upsert: true, useFindAndModify: false });
            } catch (error) {
                console.error(error);
            }
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = reddit;