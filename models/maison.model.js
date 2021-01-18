const mongoose = require('mongoose');

const Maison = mongoose.Schema({
    denomination: {type: String, required: [true, 'denomination ne doit pas être vide']},
    phone: {type: String, required: [true, 'phone  ne doit pas être vide']},
    email: {type: String, required: [true, 'email  ne doit pas être vide']},
    type: {type: Number, default: 0},
    longitude: {type: Number},
    latitude: {type: Number},
    province: {type: String, required: [true, 'province ne doit pas être vide']},
    commune: {type: String, required: [true, 'commune ne doit pas être vide']},
    ville: {type: String, required: [true, 'ville  ne doit pas être vide']},
    quartier: {type: String, required: [true, 'quartier  ne doit pas être vide']},
    avenue: {type: String},
    numero: {type: Number},
    etat: {type: Number, default: 0},
    id_card: {type: String, required: [true, 'L\'ID Card ne doit pas être vide']},
    createAt: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('maisons', Maison);