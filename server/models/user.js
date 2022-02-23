const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    email2: {
        type: String,
        unique: true
    },
    company: {
        type: [],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    platforms: {
        type: []
    },
    search: {
        type: String
    }
  }));

  module.exports = User;