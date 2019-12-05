const express = require('express')
const router = express.Router()
const db = require('../utils/db')


// /api/enfant/
// Find all enfants
router.get('/', (req, res) => {
    db.mongo
    .collection("enfants")
    .find()
    .toArray()
    .then(enfants => {
      res.json(enfants);
    }).catch((err) => {
		res.status(500).send(err)
	});
})


// /api/enfant/jeu
router.get('/jeu', () => {
    
})

module.exports = router
