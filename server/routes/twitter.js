const Twitter = require('twitter-v2');
const { Mention } = require('../models/mention');
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
            let currentTitle = '';
            currentText = element.text;
            if (currentText.length > 10) {
                currentTitle = currentText.split(' ').slice(0, 6).join(' ');
            } else {
                currentTitle = currentText;
            }
            currentTitle = currentTitle + '...';
            let mention = new Mention({
                content: element.text,
                title: currentTitle,
                platform: 'Twitter',
                image: 'https://ommcom.s3.ap-south-1.amazonaws.com/wp-content/uploads/2021/06/16124057/twitter-logo-the-week.jpg',
                date: new Date(),
                popularity: element.public_metrics.retweet_count
            });
            mention.save();
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports = twitter;