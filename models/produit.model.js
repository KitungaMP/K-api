const mongoose = require('mongoose');

const Produit = mongoose.Schema({
    denomination : {type: String, required: [true, 'denomination ne doit pas être vide']},
    quantification : {type: String, required: [true, 'quantification ne doit pas être vide']},
    couleur : {type: String},
    poids : {type: String},
    garantie : {type: String},
    caracteristiques : {type: String},
    autres_caract : {type: String},
    prix : {type: Number, required: true},
    stock_init : {type: Number, default: 0},
    num_lot : {type: Number, required: true},
    mid : {type: String, required: true},
    etat : {type: Number, default: 0},
    date_exp : {type: Date, required:true},
    createAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('produits', Produit);