const mongoose = require('mongoose');

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
    type : {type: Number, default: 0},
    date : {type: Date, default: (new Date()).getTime()},
});

module.exports = mongoose.model('transactions', Transaction);