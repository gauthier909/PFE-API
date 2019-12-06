const express = require('express')
const router = express.Router()
const db = require('../utils/db')

router.get('/', () => {
    db.mongo.collection()
})

module.exports = router
