const express = require('express')
const router = express.Router()

router.get('/enfants', () => {
    console.log('Recieved message about enfants')
    res.json("Les enfants")
})

router.get('/jeu', () => {
    
})

module.exports = router
