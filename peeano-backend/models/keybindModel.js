const mongoose = require('mongoose');

const keybindSchema = {
    user_id: String,
    keybinds: Array
}

const Keybind = mongoose.model("Keybind", keybindSchema, 'keybinds'); // Table 'users'

module.exports = Keybind;