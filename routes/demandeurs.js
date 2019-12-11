const express = require('express')
const router = express.Router()
const db = require('../modules/db')


//demandeurs pour le jeux
router.get('/', (req, res) => {
    console.log("message get all demandeurs reçu")
      db.mongo
      .collection("liste-de-données")
      .findOne({"type": "demandeur"})
      .then(demandeur => {
        res.json(demandeur.demandeur);
      }).catch((err) => {
          res.status(500).send(err)
      });
  })


  module.exports = router
