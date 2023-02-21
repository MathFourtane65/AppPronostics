const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nameTeamA: {
        type: String,
    },
    nameTeamB: {
        type: String,
    },
    place: {
        type: String,
    },
    date: {
        type: String,
    },
    halfTimeScore: {
        type: String,
    },
    endMatchScore: {
        type: String,
    },
    endPenaltiesScore: {
        type: String,
    },
    winnerTeam: {
        type: String,
    },
    status: {
        type: String,
    },
})

module.exports = mongoose.model('Match', MatchSchema);