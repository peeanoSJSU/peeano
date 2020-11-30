const mongoose = require('mongoose');

const recordingSchema = {
    recording: Array,
    username: String
}

const Recording = mongoose.model("Recording", recordingSchema, 'recordings'); // Table 'recordings'

module.exports = Recording;