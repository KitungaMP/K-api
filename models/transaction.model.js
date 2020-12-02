const mongoose = require('mongoose');
var UUID = require("uuid");

/**
 * Je prefere renommer recharge en transaction
 * 
 * comme ca il y aura un champ type
 * 0 pour achat
 * 1 pour recharger client (output)
 * 2 pour envoyer ou transferer
 */
const Transaction = mongoose.Schema({
    tid : {type: String, default: UUID.v4()},
    montant : {type: Number, default: 0},
    somme : {type: Number, default: 0},
    type : {type: Number, default: 0},
    date: {type: Date, default: Date.now()},
    uid_sender: {type: String, required: [true, "L'utilisateur ne peut être nul"]},
    uid_receiver: {type: String, required: [true, "L'utilisateur ne peut être nul"]}
});

module.exports = mongoose.model('transactions', Transaction);