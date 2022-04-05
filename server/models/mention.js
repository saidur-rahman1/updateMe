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
    },
    sentiment: {
        type: Number,
        required: true
    }
}));

module.exports = { Mention };