const mongoose = require('mongoose');
var UUID = require("uuid");

const Card = mongoose.Schema({
    cid : {type: String, default: UUID.v4()},
    id_card: {type: String, required: [true, "L'ID Card ne peut être nul"]},
    uid : {type: String, required: [true, "L'utilisateur ne peut être  nul"]},
    montant: {type: Number, default: 0},
    date_expiration: {type: Date}
});

module.exports = mongoose.model('cards', Card);