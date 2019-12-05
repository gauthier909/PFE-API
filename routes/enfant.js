const express = require('express')
const router = express.Router()
const db = require('../utils/db')

// /api/enfant/
router.get('/', (req, res) => {
    db.mongo
    .collection("enfants")
    .findOne()
    .then(enfant => {
      res.json(enfant);
    })


})

// /api/enfant/jeu
router.get('/jeu', () => {
    
})

module.exports = router
