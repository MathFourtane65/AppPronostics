const router = require("express").Router();
const Match = require("../models/Match");
var matchController = require("../api/MatchController");

router.get("/", (req, res) => {
  Match.find()
    .then((matchs) => {
      res.status(200).json(matchs);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete('/:id', matchController.deleteMatch);
router.post('/', matchController.createMatch);
router.put('/:id', matchController.updateMatch);

module.exports = router;

