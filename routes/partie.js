const express = require('express')
const router = express.Router()
const db = require('../modules/db')



router.get('/', () => {

});
router.get('/:id', () => {
    console.log(req.body)
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

  router.put('/filtre', function(req, res) {
    console.log("update jeu from API")
  });
  //add filtre to table jeu
  
  router.put('/filtre/:id', function(req, res) {
    //console.log("update jeu from API")
    //console.log(req.body)
    let choixTemp = req.body.choix
    let nomImageTemp=choixTemp.nomImage
    let valeurTemp = choixTemp.valeur
    let objetFinal={
      commentaire:req.body.commentaire,
      nom:req.body.nom,
      nomImage:nomImageTemp,
      valeur:valeurTemp
    }
    db.mongo
    .collection("jeux")
    .findOneAndUpdate({_id: new db.ObjectID(req.params.id)}, {$push: {"choix":objetFinal}}, {returnOriginal: false})
    .then((result) => {
          if (result.value) {
              res.json(result.value)
          } else {
              res.status(404).send()
          }
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
