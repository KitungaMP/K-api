const mongoose = require('mongoose');

const User = mongoose.Schema({
    fullname : {type: String},
    sexe: {type: String},
    phone : {type: String, required: [true, 'phone ne doit pas être vide']},
    password : {type: String, required: [true, 'password  ne doit pas être vide']},
    url_profile : {type: String},
    type : {type: Number, default: 0}, // 0 pour client 1 pour maison 9 pour system admin 
    default_address: {type: String}, // in the UI we can have the 3 inputs: Commune, Avenue_and_number and even quartier kisha on les concatene pour former the default address
    birthday : {type: String},
    province: {type: String},
    commune: {type: String},
    ville: {type: String},
    quartier: {type: String},
    avenue: {type: String},
    numero: {type: Number},
    etat : {type: Number, default: 0}
});

module.exports = mongoose.model('users', User);