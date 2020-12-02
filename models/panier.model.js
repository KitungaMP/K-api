const mongoose = require('mongoose');
var UUID = require("uuid");

const Panier = mongoose.Schema({
    paid : {type: String, default: UUID.v4()},
    quantity : {type: Number},
    pid : {type: String, required: [true, 'Le produit ne doit pas être nul']},
    date: { type: Date, default: Date.now()}
});

module.exports = mongoose.model('paniers', Panier);