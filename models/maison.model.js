const { Double } = require('mongodb');
const mongoose = require('mongoose');
const UUID = require("uuid");

const Maison = mongoose.Schema({
    mid: {type: String, default: UUID.v4()},
    denomination: {type: String, required: [true, 'denomination ne doit pas être vide']},
    phone: {type: String, required: [true, 'phone  ne doit pas être vide']},
    email: {type: String, required: [true, 'email  ne doit pas être vide']},
    type: {type: Number, default: 0},
    longitude: {type: Double},
    latitude: {type: Double},
    province: {type: String, required: [true, 'province ne doit pas être vide']},
    ville: {type: String, required: [true, 'ville  ne doit pas être vide']},
    quartier: {type: String, required: [true, 'quartier  ne doit pas être vide']},
    avenue: {type: String},
    numero: {type: Number},
    etat: {type: Number, default: 0},
    createAt: {type: Date, default: (new Date()).getTime()}
});

module.exports = mongoose.model('maisons', Maison);