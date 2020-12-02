const mongoose = require('mongoose');
var UUID = require("uuid");

const Achat = mongoose.Schema({
    aid : {type: String, default: UUID.v4()},
    paid : {type: String, required: [true, 'phone ne doit pas être vide']},
    cid : {type: String, required: [true, 'password  ne doit pas être vide']},
    montant : {type: Number},
    date : {type: Date, default: Date.now()},
    confirm: {type: Boolean, default: false}
});

module.exports = mongoose.model('achats', Achat);