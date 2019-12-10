const express = require('express')
const router = express.Router()
const db = require('../modules/db')

router.get('/', (req, res, next) => {
    let images = []
    db.mongo.collection('images').find().forEach((el, i) => {
        images.push(el)
    }).then(() => {
        res.json(images)
    })
})

module.exports = router