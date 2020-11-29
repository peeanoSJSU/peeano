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

app.get('/test', (req, res) => res.send(userTest));

app.listen(PORT, function() {
	console.log("Server is running on port: " + PORT);
});
