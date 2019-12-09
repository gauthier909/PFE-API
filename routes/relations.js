const express = require('express')
const router = express.Router()
const db = require('../modules/db')


// /api/enfant/
// Find all catégories
router.get('/', (req, res) => {
    console.log("message get all relation reçu")
      db.mongo
      .collection("liste-de-données")
      .findOne({"type": "relation"})
      .then(relation => {
        res.json(relation.relation);
      }).catch((err) => {
          res.status(500).send(err)
      });
  })
  
module.exports = router
