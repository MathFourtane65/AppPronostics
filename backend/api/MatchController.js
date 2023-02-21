require('dotenv').config();
var Match = require('../models/Match');

exports.createMatch = (req, res) => {
    let newMatch = Match(req.body);
    newMatch.save((err, match) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json(match);
    });
};

