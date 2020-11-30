const mongoose = require('mongoose');

const recordingSchema = {
    user_id: String,
    recording: Array,
    trackName: String
}

const Recording = mongoose.model("Recording", recordingSchema, 'recordings'); // Table 'users'

module.exports = Recording;