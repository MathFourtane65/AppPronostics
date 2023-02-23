const mongoose = require('mongoose');

const PronosticSchema = new mongoose.Schema({
    halfTimeScoreTeamA: {
        type: Number,
    },
    halfTimeScoreTeamB: {
        type: Number,
    },
    endMatchScoreTeamA: {
        type: Number,
    },
    endMatchScoreTeamB: {
        type: Number,
    },
    endPenaltiesScoreTeamA: {
        type: Number,
    },
    endPenaltiesScoreTeamB: {
        type: Number,
    },
    id_user: {
        type: String,
    },
    id_match: {
        type: String,
    },
    points : {
        type: Number,
        default: 0,
    }

})

module.exports = mongoose.model('Pronostic', PronosticSchema);