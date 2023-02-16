require('dotenv').config();
var Competition = require('../models/Competition');

exports.createCompetition = (req, res) => {
    let newCompetition = Competition(req.body);
    newCompetition.save((err, competition) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(201).json(competition);
    });
};

exports.deleteCompetition = (req, res) => {
    Competition.findByIdAndRemove(req.params.id, (err, competition) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        return res.status(200).json(competition);
    });
}