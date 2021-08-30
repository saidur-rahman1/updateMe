const mongoose = require('mongoose');

const Mention = mongoose.model('Mention', new mongoose.Schema({
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
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    popularity: {
        type: String,
        required: true
    }
  }));

  module.exports = Mention;