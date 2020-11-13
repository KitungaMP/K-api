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

  app.post('/child', (req, res) => {
    kmp_collection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
  })

  // Posts
  
  // Post Maison_vente
  
  /*
    mid
    denomination
    address
    contact
    geo { lat, long }
    date_creation,
    type ( Pharmacie , supermarket, ...)
    etat

  */

  app.post("/maison_vente", (request, response) => {
    if(!request.body.denomination){
        return response.status(401).send({ "message": "Veiller completer la denomination de votre maison de vente"});
    } else if(!request.body.address){
        return response.status(401).send({ "message": "Veiller completer l'adresse de votre maison de vente"});
    } else if(!request.body.type){
        return response.status(401).send({ "message": "Veiller completer le type de votre maison de vente"});
    }
    
    var maison_vente = {
        "mid": UUID.v4(),
        "denomination" : request.body.denomination,
        "address" : request.body.address,
        "contact" : request.body.contact,
        "date_creation" : (new Date()).getTime(),
        "type" : request.body.type,
        "etat" : 0
    }
    kmp_collection.insertOne(maison_vente)
    .then(result => {
      console.log(result)
      return response.send(maison_vente);

    })
    .catch(error => {
      console.error(error)
      return response.status(500).send(error);
    })
  });

  // Get maison de vente

  app.get("/maison_vente", (request, response) => {
    kmp_collection.find({}, { projection: { _id: 0, denomination: 1, address: 1 } }).toArray(function(err, result) {
      if (err) {
          return response.status(401).send({ "message": "Erreur de donnees "});
      } else {
          response.send(result);
      }
    });
  });

})

app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
  console.log(req.body)
  res.send(req.body);
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))