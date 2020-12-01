const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // User model
const Recording = require('../models/recordingModel'); // Recording model
const Keybind = require('../models/keybindModel');
// Password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;
// User
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js');

router.route("/signup").post(async (req, res) => { // Sign up
    try {
        const foundUser = await User.findOne({username: req.body.username}); // Find user with username
        if (foundUser) { // If username already exists in database. TODO: Fix, it is adding data twice.
            res.json({success: false});
        }
        else { // else, create new user.
            const username = req.body.username;
            const password = req.body.password;

            const hashedPass = await bcrypt.hash(password, saltRounds); // Hashed password

            const newUser = new User({
                username,
                password: hashedPass
            });

            await newUser.save(); // Save user to database
            res.json({addedNewUser: true});
        }
    }
    catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.route('/login').post(async (req, res) => { // Login
    try {
        const password = req.body.password;

        const user = await User.findOne({ username: req.body.username});
        if (!user) {
            // No account registered
            res.json({
                result: "no user exists with this username"
            })
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                // Wrong password
                res.json({
                    result: "wrong password"
                })
            } else {
                const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
                res.json({
                    token,
                    user: {
                        username: user.username
                    }
                })
            }
        }
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }


});

router.route('/tokenIsValid').post(async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    }
    catch(err) {

    }
});

router.route('/user').get(auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        username: user.username,
        id: user._id
    });
});

router.route('/getKeybinds').get(async(req, res) => {
    try{
        const user = req.body.user;
        const keybinds = await Keybind.findOne({user_id: user});
        if (keybinds) {
            res.json({keybindings: keybinds.keybinds}); // Returns keybindings in JSON
        }
        else {
            res.json({keybindings: false});
        }
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.route('/saveKeybinds').post(async(req, res) => {
    try {
        const keybindToSave = req.body.keybinds;
        const user = req.body.user; // User ID

        const newKeybinds = new Keybind ({
            user_id: user,
            keybinds: keybindToSave
        });

        const foundEditedKeys = await Keybind.findOne({user_id: user}); // If there are already edited keys

        if (foundEditedKeys) { // If already one exists
            await db.collection('keybinds').updateOne({user_id: user}, {$set: {keybinds: keybindToSave}});
            res.json({editedKeys: true});
        } else { // Otherwise add a new entry
            await newKeybinds.save();
            res.json({addedNewBinds: true});
        }
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.route('/saveRecording').post(async(req, res) => {
    try {
        const recordingToSave = req.body.recordingPiece;
        const user = req.body.user;
        const trackNameToSave = req.body.trackName;

        const foundTrackNameAlready = await Recording.findOne({trackName: trackNameToSave, user_id: user});

        if (foundTrackNameAlready) {
            return res.json({user_id: user, newRecordingAdded: false, reason: "found trackname already under user!"});
        }

        const newRecording = new Recording ({
            user_id: user,
            recording: recordingToSave,
            trackName: trackNameToSave
        });

        await newRecording.save();
        res.json({user_id: user, newRecordingAdded: true});

    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

router.route('/getRecording').get(async(req, res) => {
    try {
        const userID = req.body.user;
        const trackNameToGet = req.body.trackName;

        let recording = null;
        if (trackNameToGet) {
            recording = await Recording.findOne({trackName: trackNameToGet, user_id: userID});
        }
        else {
            recording = await Recording.find({user_id: userID}); // Will return all tracks
        }

        if (recording && trackNameToGet) {
            return res.json({user_id: userID, trackName: trackNameToGet, recording: recording.recording});
        } else if (recording) {
            return res.json(recording);
        }
        else {
            return res.json({trackFound: false});
        }
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});


module.exports = router;