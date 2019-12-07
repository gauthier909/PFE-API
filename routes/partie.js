const express = require('express')
const router = express.Router()
const db = require('../modules/db')

router.get('/', () => {
    console.log("insertion");
    let collection = db.mongo.collection("images");
    collection.insertOne({
        nom:"./images/deplacements/bus.jpg",
        categorie:"deplacements"
    })
});

router.get('/jeu', () => {
    
})

router.get('/images', function(req,res,next) {
    db.db.collection('images').find().toArray().then((images)=>{
        res.json(images);
        console.log(images);
    }).catch((err)=>{
        res.status(500).send(err);
    });
});

module.exports = router