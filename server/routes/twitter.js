const Twitter = require('twitter-v2');
const { Mention } = require('../models/mention');
const { createTitle } = require('../models/createTitle');
const TOKEN = process.env.TWITTER_BEARER_TOKEN

const client = new Twitter({
    bearer_token: TOKEN,
  });

async function twitter(searchTerm) {
    try {
        const params = {
            'query': searchTerm,
            'tweet.fields': 'public_metrics',
        }

        const outcome = await client.get('tweets/search/recent', params);
        const results = outcome.data;
        results.forEach(element => {
            const mention = new Mention({
                content: element.text,
                title: createTitle(element.text),
                platform: 'Twitter',
                image: 'https://ommcom.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/06/16124057/twitter-logo-the-week.jpg',
                date: new Date(),
                popularity: element.public_metrics.retweet_count,
                url: `https://twitter.com/i/web/status/${element.id}`
            });
            mention.save();
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports = twitter;