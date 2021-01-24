const mongoose = require('mongoose');

const Panier = mongoose.Schema({
    quantity : {type: Number},
    pid : {type: String, required: [true, 'Le produit ne doit pas être nul']},
    date: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('paniers', Panier);