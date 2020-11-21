const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.route("/signup").post((req, res) => {
    if (User.findOne({username: req.body.username}) == null) { // If username already exists in database.
        res.json({success: false});
    }
    else { // else, create new user.
        const username = req.body.username;
        const password = req.body.password;
        const newUser = new User({
            username,
            password
        });

        newUser.save();
    }
});

module.exports = router;