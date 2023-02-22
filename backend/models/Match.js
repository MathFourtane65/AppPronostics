const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
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
    colorTeamA: {
        type: String,
    },
    colorTeamB: {
        type: String,
    },
    id_competition: {
        type: String,
    },
})

module.exports = mongoose.model('Match', MatchSchema);