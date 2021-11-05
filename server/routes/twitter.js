const axios = require('axios');
const { Mention } = require('../models/mention');
const TOKEN = process.env.TWITTER_BEARER_TOKEN 

async function twitter(searchTerm) {
    try {
        const outcome = await axios.get(`https://api.twitter.com/2/tweets/search/recent?query=${searchTerm}&max_results=10 -H Authorization: Bearer ${TOKEN}`);
        console.log(outcome);
        // const results = outcome.data.data.children.map(data => data.data);
        // results.forEach(element => {
        //     const elementImage = element.preview ? element.preview.images[0].source.url : 'https://www.howtogeek.com/wp-content/uploads/2019/12/Reddit-Karma-Header.jpg?height=200p&trim=2,2,2,2';
        //     const elementContent = element.selftext ? element.selftext : 'No content';
        //     let mention = new Mention({
        //         content: elementContent,
        //         title: element.title,
        //         platform: 'Reddit',
        //         image: elementImage,
        //         date: new Date(),
        //         popularity: element.upvote_ratio
        //     });
        //     mention.save();
        // });
    } catch (err) {
        console.log(err);
    }
}

module.exports = twitter;