const router = require('express').Router();
const Maison = require('../models/maison.model');
const Produit = require('../models/produit.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');

// MAISON ENDPOINTS

// get all the maisons
router.get('/maisons', (req, res) => {
    Maison.find()
        .then(maisons => req.json(maisons))
        .catch(err => res.status(400).json({msg:err}));
});

// get a maison by id
router.get('/maisons/:mid', (req, res) => {
    Maison.findById(req.params.mid)
        .then(maison => res.json(maison))
        .catch(err => res.status(400).json({msg:err}));
});

// post a maison
router.post('/maisons', (req, res) => {
    
    const {denomination, phone, email, type, longitude, latitude, province, ville, quartier, avenue, numero, etat} = req.body;
    newMaison = new Maison(req.body);

    newMaison.save()
        .then(maisonSaved => res.json(maisonSaved))
        .catch(err => res.status(400).json({msg:err}));
});

// PRODUITS ENDPOINTS

// get all the produits
router.get('/produits', (req, res) => {
    Produit.find()
        .then(produits => req.json(produits))
        .catch(err => res.status(400).json({msg:err}));
});

// get a produit by id
router.get('/produits/:pid', (req, res) => {
    Produit.findById(req.params.pid)
        .then(produit => res.json(produit))
        .catch(err => res.status(400).json({msg:err}));
});

// post a produit
router.post('/produits', (req, res) => {

    const {denomination, quantification, prix, stock_init, num_lot, mid, etat, date_exp, etat} = req.body;
    newMaison = new Produit(req.body);

    newProduit.save()
        .then(produitSaved => res.json(produitSaved))
        .catch(err => res.status(400).json({msg:err}));
});

// TRANSACTION ENDPOINTS

// get all the produits
router.get('/transactions', (req, res) => {
    Produit.find()
        .then(transactions => req.json(transactions))
        .catch(err => res.status(400).json({msg:err}));
});

// get a produit by id
router.get('/transactions/:tid', (req, res) => {
    Produit.findById(transaction)
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json({msg:err}));
});

// post a produit
router.post('/transactions', (req, res) => {

    const {montant, type, date, uid} = req.body;
    newTransaction = new Produit(req.body);

    newTransaction.save()
        .then(transactionSaved => res.json(transactionSaved))
        .catch(err => res.status(400).json({msg:err}));
});

module.exports = router;