const router = require('express').Router();
const Maison = require('../models/maison.model');
const Produit = require('../models/produit.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');


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

// register a unser

router.post('/register', (req, res) => {
    const { phone , password } = req.body;
    User.findOne({phone}) // find the user by phone
        .then(phon => {
            if(!phon){ // if the user doen't exit with this phone number 
                res.status(400).send({error_message: 'Un autre utilisateur existe sur ce numéro de téléphone'});
            }else{ // we get the user who has that phone number
                const newUser = new User({ phone, password });

                // chiffrer le password
                bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => { // hashing the password
                        if(err) throw err;
                        newUser.password = hash; // passing the hashed password to the user model

                        newUser.save()
                            .then(user => {
                                // process for jwt generating token 
                                jwt.sign( 
                                    {id: user.id},
                                    process.env.SECRET_KEY,
                                    {expiresIn: 3600},
                                    (err, token) => {
                                        if(err) throw err;
                                        // return token, phone and password
                                        res.json({
                                            token, 
                                            user:{
                                                phone: user.phone,
                                                password: user.password
                                            }
                                        });
                                    }
                                 )
                            })
                            .catch(err => res.status(400).send({error_message: err}));
                    });
                });
            }
        })
        .catch(err => res.status(400).send({error_message: err}));
});

// sign in
router.post('/signin', (req, res) => {
    const { phone, password } = req.body;

    if(!phone || !password) { // if the fields remain empty
        res.status(400).send({error_message: "Le phone ou le mot de passe ne doivent pas être vide"});
    }

    User.findOne({phone}) // find user by his phone number
        .then(user => {
            if(!user){ // the user doesn't exist
                res.status(400).send({error_message: `Aucun compte n'est enregistré sous ce numéro ${phon}` })
            }else{
                bcrypt.compare(password, user.password) // comparing password
                    .then(success => {
                        if(!success) res.status(400).send({error_message: "Vous avez saisi un mot de passe incorrect"});

                        // generating token when the login is successfull
                        jwt.sign(
                            {id: user.id},
                            process.env.SECRET_KEY,
                            {expiresIn: 3600},
                            (err, token) => {
                                if(err) throw err;
                                res.json({
                                    token
                                })
                            }
                        )
                    })
                    .catch(err => res.status(400).send({error_message: err}));
            }
            
        })
        .catch(err => res.status(400).send({error_message: err}));        
});

module.exports = router;