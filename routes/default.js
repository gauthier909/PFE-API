const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    console.log('Recieved message from fronted-angular')
    res.json("Hello World")
})



module.exports = router
