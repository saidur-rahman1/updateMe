const sentimentAnalysis = require('sentiment-analysis');

const sentiment = (text) => {
    const currentSentiment = [];
    currentSentiment[0] = sentimentAnalysis(text);
    if (currentSentiment[0] > 0) {
        currentSentiment[1] = '😃';
    } else if (currentSentiment[0] < 0) {
        currentSentiment[1] = '😕';
    } else {
        currentSentiment[1] = '😐';
    }
    return currentSentiment;
};

module.exports = { sentiment };