const mongoose = require('mongoose');

const Scores = mongoose.Schema({
    name : {type: String, required: [true, "L'utilisateur ne peut être  nul"]},
    scores : {type: Number, required: true},
});

module.exports = mongoose.model('scores', Scores);