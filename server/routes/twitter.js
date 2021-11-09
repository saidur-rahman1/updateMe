const axios = require('axios');
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
            'user.fields': 'username',
            'tweet.fields': 'public_metrics'
        }
        //const outcome = await client.get(`https://api.twitter.com/2/tweets/search/recent?query=${searchTerm}&max_results=10 -H Authorization: Bearer ${TOKEN}`);
        const outcome = await client.get('tweets/search/recent', params);
        const results = outcome.data;
        console.log(results);
    } catch (err) {
        console.log(err);
    }
}

module.exports = twitter;