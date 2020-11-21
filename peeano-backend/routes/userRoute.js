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

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (User.find( { $and: [{username : username}, {password: password}]}) == null) {
        res.json({foundUser: "did not find a user: " + req.body.username});
    } else {
        res.json({foundUser: "We found user: " + req.body.username});
    }
});



module.exports = router;