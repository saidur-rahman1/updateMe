const axios = require('axios');
const { Mention } = require('../models/mention');
const sentimentAnalysis = require('sentiment-analysis');

async function reddit(searchTerm) {
    try {
        const outcome = await axios.get(`http://www.reddit.com/search.json?q=${searchTerm}`);
        const results = outcome.data.data.children.map(data => data.data);
        results.forEach( async (element) => {
            try {
                const currentSentiment = sentimentAnalysis(element.text);
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
                        sentiment: currentSentiment
                    }, 
                { upsert: true, useFindAndModify: false });
            } catch (error) {
                console.error(error);
            }
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = reddit;