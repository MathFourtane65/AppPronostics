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

exports.deleteMatch = (req, res) => {
    const matchId = req.params.id;
    Match.findByIdAndRemove(matchId, (err, match) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (!match) {
            return res.status(404).json({ 'msg': 'Match not found' });
        }
        return res.status(200).json({ 'msg': 'Match deleted successfully' });
    });
};

exports.updateMatch = (req, res) => {
    const matchId = req.params.id;
    Match.findByIdAndUpdate(matchId, req.body, { new: true }, (err, match) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (!match) {
            return res.status(404).json({ 'msg': 'Match not found' });
        }
        return res.status(200).json(match);
    });
};

