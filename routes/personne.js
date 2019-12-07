const express = require('express')
const router = express.Router()
const db = require('../modules/db')

router.get('/', () => {
    db.mongo.collection()
})

module.exports = router
