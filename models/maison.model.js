const mongoose = require('mongoose');
const UUID = require("uuid");

const Maison = mongoose.Schema({
    mid:{type: String, default: UUID.v4()},
    denomination: {type: String, required: [true, 'Veuillez completer le champ denomination']},
    phone: {type: String, required: [true, 'Veuillez completer le champ phone']},
    email: {type: String, required: [true, 'Veuillez completer le champ email']},
    type: {type: Number, default: 0},
    province: {
        ville: {type: String, required: [true, 'Veuillez completer le champ ville']},
        quartier: {type: String, required: [true, 'Veuillez completer le champ quartier']},
        avenue: {type: String, required: [true, 'Veuillez completer le champ avenue']},
        numero: {type: Number, required: [true, 'Veuillez completer le champ avenue']}
    },
    etat: {type: String, required: [true, 'Veuillez completer le champ denomination']},
    createAt: {type: Date, default: (new Date()).getTime()}
});

module.exports = mongoose.model('maisons', Maison);