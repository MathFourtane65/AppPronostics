require('dotenv').config();
var Pronostic = require('../models/Pronostic');

exports.createPronostic = (req, res) => {
    let newPronostic = Pronostic(req.body);
    newPronostic.save((err, pronostic) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json(pronostic);
    });
};

exports.getAllByMatch = (req, res) => {
    const matchId = req.params.id_match;
    Pronostic.find({id_match: matchId}, (err, pronostics) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (!pronostics) {
            return res.status(404).json({ 'msg': 'Pronostics not found with match' });
        }
        return res.status(200).json(pronostics);
    });
};


exports.deletePronostic = (req, res) => {
    const pronosticId = req.params.id;
    Pronostic.findByIdAndRemove(pronosticId, (err, pronostic) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (!pronostic) {
            return res.status(404).json({ 'msg': 'Pronostic not found' });
        }
        return res.status(200).json({ 'msg': 'Pronostic deleted successfully' });
    });
};

exports.getOnePronostic = (req, res) => {
    const pronosticId = req.params.id;
    Pronostic.findById(pronosticId, (err, pronostic) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (!pronostic) {
            return res.status(404).json({ 'msg': 'Pronostic not found' });
        }
        return res.status(200).json(pronostic);
    });
}
