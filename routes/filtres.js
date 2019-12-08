const express = require('express')
const router = express.Router()
const db = require('../modules/db')


// /api/filtres/
// Find all filtres
router.get('/', (req, res) => {
    console.log("message get all filtres reçu")
      db.mongo
      .collection("liste-de-données")
      .findOne({"type": "filtres"})
      .then(filtres => {
        console.log(filtres.filtres);
        res.json(filtres.filtres);
      }).catch((err) => {
          res.status(500).send(err)
      });
  })
  
module.exports = router
