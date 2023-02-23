const router = require("express").Router();
const Pronostic = require("../models/Pronostic");
var pronosticController = require("../api/PronosticController");

router.get("/", (req, res) => {
  Pronostic.find()
    .then((pronostics) => {
      res.status(200).json(pronostics);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post('/', pronosticController.createPronostic);
router.get('/:id', pronosticController.getOnePronostic);
//router.get('/byMatch/:id', pronosticController.getPronosticsByMatch);
router.delete('/:id', pronosticController.deletePronostic);

module.exports = router;

