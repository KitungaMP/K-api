const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { mkdir } = require('fs')
const app = express()

var UUID = require("uuid");
var BCrypt = require("bcryptjs");

const MongoClient = require('mongodb').MongoClient

const PORT = process.env.PORT || 5000

// Make sure you place body-parser before your CRUD handlers!
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true} ));

connectionString = "mongodb+srv://kmp-admin:admin@kmp-cluster.98jzy.mongodb.net/kmp-db?retryWrites=true&w=majority"

MongoClient.connect(connectionString, { useUnifiedTopology: true})
.then(client => {
  console.log('Connected to Database')
  const db = client.db('kmp-admin')
  const kmp_collection = db.collection('one_plus')
});

  app.use('/api', require('./routes/api'));

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
