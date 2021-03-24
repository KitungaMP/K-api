const mongoose = require('mongoose');

const Scores = mongoose.Schema({
    id_scores: {type: String, required: [true, "L'ID Score ne peut être nul"]},
    uid : {type: String, required: [true, "L'utilisateur ne peut être  nul"]},
});

module.exports = mongoose.model('scores', Scores);