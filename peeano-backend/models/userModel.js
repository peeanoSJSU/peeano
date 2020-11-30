const mongoose = require('mongoose');

const userSchema = {
    username: String,
    password: String
}

const User = mongoose.model("User", userSchema, 'users'); // Table 'users'

module.exports = User;