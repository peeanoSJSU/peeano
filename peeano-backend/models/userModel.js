const mongoose = require('mongoose');

const userSchema = {
    username: String,
    password: String
}

const User = mongoose.model("User", userSchema, 'users');

module.exports = User;