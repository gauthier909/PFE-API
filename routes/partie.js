const express = require('express')
const router = express.Router()
const db = require('../modules/db')

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

//add filtre
router.post('/filtre', (req, res) => {
    //console.log('ajout filtre from API')
    db.mongo.collection("filtres").insertOne(req.body).then((result) =>{
      req.body._id = result.insertedId
      res.json(req.body)
    }).catch((err) => {
      res.status(500).send(err)
    });
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


router.get('/imagesCategorie/:categorie', (req, res) => {
    //supprimer accent
    console.log("chemin image by categorie from API")
    console.log(req.params.categorie)
      db.mongo
      .collection("images")
      .find({categorie:req.params.categorie})
      .map(function(n){return n.nom})
      .toArray()
      .then(images => {
         // console.log(images)
        res.json(images);
      }).catch((err) => {
          res.status(500).send(err) 
      });
  })

module.exports = router