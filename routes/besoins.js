const express = require('express')
const router = express.Router()
const db = require('../modules/db')


// /api/enfant/
// Find all besoins
router.get('/', (req, res) => {
    console.log("message get all Besoins reçu")
      db.mongo
      .collection("liste-de-données")
      .findOne({"type": "besoin"})
      .then(besoin => {
        res.json(besoin.besoin);
      }).catch((err) => {
          res.status(500).send(err)
      });
  })
  
module.exports = router
