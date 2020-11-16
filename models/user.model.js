const mongoose = require('mongoose');

const User = mongoose.Schema({
    uid : {type: String, default: UUID.v4()},
    phone : {type: String, required: [true, 'phone ne doit pas etre vide']},
    password : {type: String, required: [true, 'password  ne doit pas etre vide']},
    type : {type: Number, default: 0}, // 0 pour client 1 pour maison 9 pour system admin
    birthday : {type: String},
    adresse: {type: String, required: [true, 'password ne doit pas etre vide']}, // on pourra diviser ce champ apres
    etat : {type: Number, default: 0}
});

module.exports = mongoose.model('users', User);