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
    Maison.findById(maison)
        .then(maison => res.json(maison))
        .catch(err => res.status(400).json({msg:err}));
});

// post a maison
router.post('/maisons', (req, res) => {
    
    const {denomination, phone, email, type, ville, quartier, avenue, numero, etat} = req.body;
    newMaison = new Maison(req.body);

    newMaison.save()
        .then(maisonSaved => res.json(maisonSaved))
        .catch(err => res.status(400).json({msg:err}));
});


module.exports = router;