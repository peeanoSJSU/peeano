const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3001;

// let Peeano = require('./peeano.model');
let Users = require('./users.model');

app.use(cors());
app.use(express.json());

// Connect to mongoose
mongoose.connect('mongodb+srv://alanparksjsu:peeanosjsu@cluster0.t2kms.mongodb.net/peeano?retryWrites=true&w=majority');
app.use('/', require('./routes/userRoute'));

app.listen(PORT, function() {
	console.log("Server is running on port: " + PORT);
});
