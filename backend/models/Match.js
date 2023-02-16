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
        type: Date,
    },
    halfTimeScore: {
        type: [Number],
    },
    endMatchScore: {
        type: [Number],
    },
    endPenaltiesScore: {
        type: [Number],
    },
    winnerTeam: {
        type: String,
    }
})

module.exports = mongoose.model('Match', MatchSchema);