const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Peeano = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
});

module.exports = mongoose.model('Peeano', Peeano);
