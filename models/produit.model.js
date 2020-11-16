const mongoose = require('mongoose');

const Produit = mongoose.Schema({
    pid : {type: String, default: UUID.v4()},
    denomination : {type: String, required: [true, 'denomination ne doit pas etre vide']},
    quantification : {type: String, required: [true, 'quantification ne doit pas etre vide']},
    prix : {type: Number, required: true},
    stock_init : {type: Number, default: 0},
    num_lot : {type: Number, required: true},
    mid : {type: String, required: true},
    etat : {type: Number, default: 0},
    date_exp : {type: Date, required:true},    
    date_creation : (new Date()).getTime(),
});

module.exports = mongoose.model('produits', Produit);