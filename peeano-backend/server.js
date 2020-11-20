const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const peeanoRoutes = express.Router();
const PORT = 4000;

// let Peeano = require('./peeano.model');
let Users = require('./users.model');

app.use(cors());
app.use(bodyParser.json());

// MONGODB Atlas
const {MongoClient} = require('mongodb');
const uri = "mongodb+srv://alanparksjsu:peeanosjsu@cluster0.t2kms.mongodb.net/peeano?retryWrites=true&w=majority";
const client = new MongoClient(uri);
var userTest = "";
async function main() {
	try {
		await client.connect();
		// await listDatabases(client);

		console.log("PEEANO DATABASE Query: ");
		const db = client.db("peeano");
		const col = db.collection("users");

		const myDoc = await col.findOne({"username":"test"});
		console.log(myDoc);
		userTest = myDoc;

	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}
main().catch(console.error);

async function listDatabases(client) {
	databasesList = await client.db().admin().listDatabases();
	console.log("Databases: ");
	databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};


// END MONGODB Atlas

mongoose.connect('mongodb://127.0.0.1:27017/peeano', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
	console.log("MongoDB database connection established successfully!");
});

peeanoRoutes.route('/').get(function(req, res) {
	Users.find(function (err, user) {
		if (err) {
			console.log(err);
		} else {
			res.json(user);
		}
	});
});

peeanoRoutes.route('/:id').get(function(req, res) {
	let id = req.params.id;
	Users.findById(id, function(err, user) {
		res.json(user);
	});
});

peeanoRoutes.route('/update/:id').post(function(req, res) {
	Users.findById(req.params.id, function (err, user) {
		if (!user) {
			res.status(404).send("data is not found!");
		} else {
			user.username = req.body.username;
			user.password = req.body.password;

			user.save().then(user => {
				res.json('Peeano User updated!');
			}).catch(err => {
				res.status(400).send("Update not possible");
			});
		}
	});
});

peeanoRoutes.route('/add').post(function(req, res) {
	let user = new Users(req.body);
	user.save().then(todo => {
		res.status(200).json({'peeano' : 'peeano user added successfully'});
	}).catch(err => {
		res.status(400).send('adding new user failed');
	});
});

app.use('/peeano', peeanoRoutes);

app.get('/hey', (req, res) => res.send(userTest));

app.listen(PORT, function() {
	console.log("Server is running on port: " + PORT);
});
