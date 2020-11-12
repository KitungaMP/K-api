const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

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
  const quotesCollection = db.collection('one_plus')

  app.post('/child', (req, res) => {
    quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
    })
    .catch(error => console.error(error))
  })
  
})
.catch(error => console.error(error))



app.post('/quotes', (req, res) => {
  console.log('Hellooooooooooooooooo!')
  console.log(req.body)
  //return response.status(401).send({ "message": "Veillez vous identifier"});
  //response.send({"pid":request.body.pid});
  res.send(req.body);
})


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))