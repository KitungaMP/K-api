const mongoose = require('mongoose');

const Scores = mongoose.Schema({
    id_scores: {type: String, required: [true, "L'ID Score ne peut être nul"]},
    name : {type: String, required: [true, "L'utilisateur ne peut être  nul"]},
    scores : {type: Number, required: true},

});

module.exports = mongoose.model('scores', Scores);