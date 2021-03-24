const router = require('express').Router();
const Maison = require('../models/maison.model');
const Produit = require('../models/produit.model');
const User = require('../models/user.model');
const Transaction = require('../models/transaction.model');
const Achat = require('../models/achat.model');
const Card = require('../models/card.model');
const Panier = require('../models/panier.model');
var bcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const Scores = require('../models/scores.model');


router.get('/test', async (req, res) => {
    await res.send('API works perfectly ...');
});

// MAISON ENDPOINTS

// get all the maisons
router.get('/maisons', async (req, res) => {
    await Maison.find()
        .then(maisons => res.json(maisons))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a maison by id
router.get('/maisons/:id', async (req, res) => {
    await Maison.findById(req.params.id)
        .then(maison => res.json(maison))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a maison
router.post('/maisons', async (req, res) => {
    
    const {denomination, phone, email, type, longitude, latitude, province, ville, quartier, avenue, numero, etat, id_card} = req.body;
    newMaison = new Maison(req.body);

    await newMaison.save()
        .then(maisonSaved => res.json(maisonSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

// put maison
router.put('/maisons/:id', async (req, res) => {

    const {denomination, phone, email, type, longitude, latitude, province, ville, quartier, avenue, numero, etat, id_card} = req.body;
    
    Maison.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send('Votre maison a été mise à jour avec succès.'))
        .catch(err => res.status(400).send({error_message: err}));
});

// PRODUITS ENDPOINTS

// get all the produits
router.get('/produits', async (req, res) => {
    await Produit.find()
        .then(produits => res.json(produits))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a produit by id
router.get('/produits/:id', async (req, res) => {
    await Produit.findById(req.params.id)
        .then(produit => res.json(produit))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a produit
router.post('/produits', async (req, res) => {

    const {denomination, quantification, couleur, poids, garantie, caracteristiques,autres_caract , prix, stock_init, num_lot, mid, etat, date_exp} = req.body;
    newProduit = new Produit(req.body);

    await newProduit.save()
        .then(produitSaved => res.json(produitSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

// put a produit
router.put('/produits/:id', async (req, res) => {

    const {denomination, quantification, couleur, poids, garantie, caracteristiques,autres_caract , prix, stock_init, num_lot, mid, etat, date_exp} = req.body;
    
    await Produit.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send('Votre produit a été mis à jour avec succès.'))
        .catch(err => res.status(400).send({error_message: err}));
});

// TRANSACTION ENDPOINTS

// get all the transactions
router.get('/transactions', async (req, res) => {
    await Transaction.find()
        .then(transactions => res.json(transactions))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a transaction by id
router.get('/transactions/:id', async (req, res) => {
    await Transaction.findById(req.params.id)
        .then(transaction => res.json(transaction))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a transaction
router.post('/transactions', async (req, res) => {

    const {montant, somme, type, date, uid_sender, uid_receiver} = req.body;
    newTransaction = new Transaction(req.body);

    await newTransaction.save()
        .then(transactionSaved => res.json(transactionSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

// register a user
router.post('/register', async (req, res) => {
    const { fullname, phone , password } = req.body;
    if(!fullname) res.status(400).send({error_message: 'Le nom complet de doit pas être vide'});
    await User.findOne({phone}) // find the user by phone
        .then(phon => {
            if(phon){ // if the user doen't exit with this phone number 
                res.status(400).send({error_message: 'Un autre utilisateur existe sur ce numéro de téléphone'});
            }else{ // we get the user who has that phone number
                const newUser = new User({ fullname, phone, password });

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
                                                fullname: user.fullname,
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
router.post('/signin', async (req, res) => {
    const { phone, password } = req.body;

    if(!phone || !password) { // if the fields remain empty
        res.status(400).send({error_message: "Le phone ou le mot de passe ne doivent pas être vide"});
    }

    await User.findOne({phone}) // find user by his phone number
        .then(user => {
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
                                    token,
                                    user
                                })
                            }
                        )
                    })
                    .catch(err => res.status(400).send({error_message: err}));
        })
        .catch(err => res.status(400).send({error_message: `Aucun compte n'est enregistré sous ce numéro`}));        
});

// update user profile

router.put('/profile/:id', async (req, res) => {
    const {fullname, sexe, phone , default_address, birthday, province, ville, quartier, avenue, numero} = req.body;
    
    await User.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send('Votre profile a été mis à jour avec succès.'))
        .catch(err => res.status(400).send({error_message: err}));
});

// ACHATS ENDPOINTS

// get all the achats
router.get('/achats', async (req, res) => {
    await Achat.find()
        .then(achats => res.json(achats))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a achat by id
router.get('/achats/:id', async (req, res) => {
    await Achat.findById(req.params.id)
        .then(achat => res.json(achat))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a achat
router.post('/achats', async (req, res) => {
    
    const {paid, cid, montant, date, confirm } = req.body;
    newAchat = new Achat(req.body);

    await newAchat.save()
        .then(achatSaved => res.json(achatSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

// CARD ENDPOINTS

// get all the cards
router.get('/cards', async (req, res) => {
    await Card.find()
        .then(cards => res.json(cards))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a card by id
router.get('/cards/:id', async (req, res) => {
    await Card.findById(req.params.id)
        .then(card => res.json(card))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a card
router.post('/cards', async (req, res) => {
    
    const {id_card, uid, montant, date_expiration } = req.body;
    newCard = new Card(req.body);

    await newCard.save()
        .then(cardSaved => res.json(cardSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

// put card
router.put('/cards/:id', async (req, res) => {
    const {id_card, uid, montant, date_expiration } = req.body;

    await Card.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.send('Votre carte a été mise à jour avec succès.'))
        .catch(err => res.status(400).send({error_message: err}));
});

// PANIER ENDPOINTS

// get all the paniers
router.get('/paniers', async (req, res) => {
    await Panier.find()
        .then(paniers => res.json(paniers))
        .catch(err => res.status(400).json({error_message:err}));
});

// get a panier by id
router.get('/paniers/:id', async (req, res) => {
    await Panier.findById(req.params.id)
        .then(panier => res.json(panier))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a Panier
router.post('/paniers', async (req, res) => {
    
    const {quantity, pid, date } = req.body;
    newPanier = new Panier(req.body);

    await newPanier.save()
        .then(panierSaved => res.json(panierSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

// SCORES ENDPOINTS

// get all the scores
router.get('/scores', async (req, res) => {
    await Scores.find()
        .then(scores => res.json(scores))
        .catch(err => res.status(400).json({error_message:err}));
});

// post a score
router.post('/scores', async (req, res) => {
    
    const {id_score, name, scores } = req.body;
    newScore = new Score(req.body);

    await newScore.save()
        .then(scoresSaved => res.json(scoresSaved))
        .catch(err => res.status(400).json({error_message:err}));
});

module.exports = router;
