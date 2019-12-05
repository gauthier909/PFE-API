const express = require('express')
const router = express.Router()
const db = require('../utils/db')

router.get('/', () => {
    console.log("insertion");
    let collection = db.mongo.collection("images");
    /*collection.insertMany([
        {
        nom:"./images/deplacements/marcher.jpg",
        categorie:"deplacements"
    },
    {
        nom:"./images/deplacements/traverser.jpg",
        categorie:"deplacements"

    }
])*/
});

router.get('/jeu', () => {
    
})

router.get('/images', function(req,res,next) {
    db.mongo.collection('images').find().toArray().then((images)=>{
        res.json(images);
        console.log(images);
    }).catch((err)=>{
        res.status(500).send(err);
    });
});

module.exports = router