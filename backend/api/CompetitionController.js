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
    const competitionId = req.params.id;
    Competition.findByIdAndRemove(competitionId, (err, competition) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (!competition) {
            return res.status(404).json({ 'msg': 'Competition not found' });
        }
        return res.status(200).json({ 'msg': 'Competition deleted successfully' });
    });
};

exports.getOneCompetition = (req, res) => {
    const competitionId = req.params.id;
    Competition.findById(competitionId, (err, competition) => {
        if (err) {
            return res.status(400).json({ 'msg': err });
        }
        if (!competition) {
            return res.status(404).json({ 'msg': 'Competition not found' });
        }
        return res.status(200).json(competition);
    });
}
