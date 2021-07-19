const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password1: {
        type: String,
        required: true
    },
    password2: {
        type: String,
        required: true
    }
  }));

  module.exports = User;