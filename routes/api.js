const router = require('express').Router();
const Maison = require('../models/maison.model');
const Produit = require('../models/produit.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');


router.get('/test', (req, res) => {
    res.send('API works perfectly ...');
});

// MAISON ENDPOINTS

// get all the maisons
router.get('/maisons', (req, res) => {
    Maison.find()
        .then(maisons => res.json(maisons))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a maison by id
router.get('/maisons/:mid', (req, res) => {
    Maison.findById(req.params.mid)
        .then(maison => res.json(maison))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a maison
router.post('/maisons', (req, res) => {
    
    const {denomination, phone, email, type, longitude, latitude, province, ville, quartier, avenue, numero, etat} = req.body;
    newMaison = new Maison(req.body);

    newMaison.save()
        .then(maisonSaved => res.json(maisonSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

// PRODUITS ENDPOINTS

// get all the produits
router.get('/produits', (req, res) => {
    Produit.find()
        .then(produits => res.json(produits))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a produit by id
router.get('/produits/:pid', (req, res) => {
    Produit.findById(req.params.pid)
        .then(produit => res.json(produit))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a produit
router.post('/produits', (req, res) => {

    const {denomination, quantification, couleur, poids, garantie, caracteristiques,autres_caract , prix, stock_init, num_lot, mid, etat, date_exp} = req.body;
    newProduit = new Produit(req.body);

    newProduit.save()
        .then(produitSaved => res.json(produitSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

// TRANSACTION ENDPOINTS

// get all the transactions
router.get('/transactions', (req, res) => {
    Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a transaction by id
router.get('/transactions/:tid', (req, res) => {
    Transaction.findById(req.params.tid)
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a transaction
router.post('/transactions', (req, res) => {

    const {montant, type, date, uid} = req.body;
    newTransaction = new Transaction(req.body);

    newTransaction.save()
        .then(transactionSaved => res.json(transactionSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

module.exports = router;