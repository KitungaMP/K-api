const mongoose = require('mongoose');
var UUID = require("uuid");

const Card = mongoose.Schema({
    cid : {type: String, default: UUID.v4()},
    id_card: {type: String, required: [true, "L'ID Card ne peut être nul"]},
    Uid : {type: String, required: [true, "L'utilisateur ne peut être  nul"]}
});

module.exports = mongoose.model('cards', Card);