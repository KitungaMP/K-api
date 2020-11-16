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
    etat,
    ville

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
        "etat" : 0,
        "ville" : request.body.ville
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

  // Products
  
  /**
   * pid
   * denomination
   * prix
   * stock_init
   * quantification (carton, kg, plt, pieces)
   * date_creation
   * num_lot
   * mid
   * etat
   * date_exp
   */

  app.post("/product", (request, response) => {
    if(!request.body.denomination){
        return response.status(401).send({ "message": "Veiller completer la denomination de votre produit"});
    } else if(!request.body.prix){
        return response.status(401).send({ "message": "Veiller completer le prix de votre produit"});
    } else if(!request.body.quantification){
        return response.status(401).send({ "message": "Veiller completer la quantification de votre produit"});
    }else if(!request.body.mid){
      return response.status(401).send({ "message": "Votre produit doit appartenir a une maison de vente"});
    }
    
    var product = {
      "pid" : UUID.v4(),
      "denomination" : request.body.denomination,
      "prix" : request.body.prix,
      "stock_init" : request.body.stock_init,
      "quantification" : request.body.quantification,
      "date_creation" : (new Date()).getTime(),
      "num_lot" : request.body.num_lot,
      "mid" : request.body.mid,
      "etat" : 0,
      "date_exp" : request.body.date_exp
    }

    kmp_collection.insertOne(product)
    .then(result => {
      console.log(result)
      return response.send(product);

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

  // Get product

  app.get("/product", (request, response) => {
    kmp_collection.find({}, { projection: { _id: 0, denomination: 1, prix: 1 } }).toArray(function(err, result) {
      if (err) {
          return response.status(401).send({ "message": "Erreur de donnees "});
      } else {
          response.send(result);
      }
    });
  });

})

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
