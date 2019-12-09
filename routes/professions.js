const express = require('express')
const router = express.Router()
const db = require('../modules/db')


// /api/professions/
// Find all professions
router.get('/', (req, res) => {
    console.log("message get all professions reçu")
      db.mongo
      .collection("liste-de-données")
      .findOne({"type": "profession"})
      .then(professions => {
        res.json(professions.profession);
      }).catch((err) => {
          res.status(500).send(err)
      });
  })

  

  
module.exports = router
