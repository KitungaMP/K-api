const mongoose = require('mongoose');

const Produit = mongoose.Schema({
    pid : {type: String, default: UUID.v4()},
    denomination : {type: String, required: [true, 'Veuillez completer le champ denomination']},
    quantification : {type: String, required: [true, 'Veuillez completer le champ quantification']},
    prix : {type: Number, required: true},
    stock_init : {type: Number, default: 0},
    num_lot : {type: Number, required: true},
    mid : {type: String, required: true},
    etat : {type: Number, default: 0},
    date_exp : {type: Date, required:true},    
    date_creation : (new Date()).getTime(),
});

module.exports = mongoose.model('produits', Produit);