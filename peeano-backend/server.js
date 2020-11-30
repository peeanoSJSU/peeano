const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const PORT = 3001;

app.use(cors());
app.use(express.json());
dotenv.config();

// Connect to mongoose (credentials in .env file).
mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`);

console.log("DB connected");
app.use('/', require('./routes/userRoute'));

app.listen(PORT, function() {
	console.log("Server is running on port: " + PORT);
});
