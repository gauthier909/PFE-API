const express = require('express')
const router = express.Router()
const db = require('../modules/db')


<<<<<<< HEAD
<<<<<<< HEAD
// /api/enfant/
// Find all besoins
=======
=======
>>>>>>> 65f3fb695610238216bb7471d1c816ec1cdd8e5c
// /api/besoin/
// Find all catégories
>>>>>>> 65f3fb695610238216bb7471d1c816ec1cdd8e5c
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
