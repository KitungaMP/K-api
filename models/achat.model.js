const mongoose = require('mongoose');

const Achat = mongoose.Schema({
    paid : {type: String, required: [true, 'phone ne doit pas être vide']},
    cid : {type: String, required: [true, 'password  ne doit pas être vide']},
    montant : {type: Number},
    date : {type: Date, default: Date.now()},
    confirm: {type: Boolean, default: false}
});

module.exports = mongoose.model('achats', Achat);