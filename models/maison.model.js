const mongoose = require('mongoose');
const UUID = require("uuid");

const Maison = mongoose.Schema({
    mid: {type: String, default: UUID.v4()},
    denomination: {type: String, required: [true, 'denomination  ne doit pas etre vide']},
    phone: {type: String, required: [true, 'phone  ne doit pas etre vide']},
    email: {type: String, required: [true, 'email  ne doit pas etre vide']},
    type: {type: Number, default: 0},
    province: {
        ville: {type: String, required: [true, 'ville  ne doit pas etre vide']},
        quartier: {type: String, required: [true, 'quartier  ne doit pas etre vide']},
        avenue: {type: String, required: [true, 'avenue  ne doit pas etre vide']},
        numero: {type: Number, required: [true, 'avenue  ne doit pas etre vide']}
    },
    etat: {type: Number, default: 0},
    createAt: {type: Date, default: (new Date()).getTime()}
});

module.exports = mongoose.model('maisons', Maison);