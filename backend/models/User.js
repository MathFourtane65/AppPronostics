const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        
    },
    favoriteTeam: {
        type: String,
    },
    numberPoints: {
        type: Number,
    }
})

module.exports = mongoose.model('User', UserSchema);