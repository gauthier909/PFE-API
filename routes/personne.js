const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const _ =  require('lodash')
var crypt = require('../middlewares/crypt')
//find all personnes
router.get('/', (req,res) => {
    console.log('message personne')
    db.mongo
    .collection("personnes")
    .find()
    .toArray()
    .then(personnes => {
      res.json(personnes);
    }).catch((err) => {
		res.status(500).send(err)
	});
})

//add personne
router.post('/', (req, res) => {
    console.log("debut insertion personne")
    var passwordHash = req.body.password;
    req.body.password=crypt.cryptPassword(passwordHash);
    db.mongo.collection("personnes").insertOne(req.body).then((result) =>{
      req.body._id = result.insertedId
      res.json(req.body)
    }).catch((err) => {
      res.status(500).send(err)
    });
  });

  //get personne by id
  router.get('/:id', (req, res) => {
    //console.log('test get id')
    db.mongo
    .collection("personnes")
    .findOne({_id: new db.ObjectID(req.params.id)})
    .then(personne => {
      res.json(personne);
     
    }).catch((err) => {
    res.status(500).send(err)
  });
  })
/* 
find a person by name
*/
router.get('/nom/:nom', (req, res) => {
  console.log("message tofind with name personne reçu")
  db.mongo
    .collection("personnes")
    .find({ nom: req.params.nom })
    .toArray()
    .then(personnes => {
      res.json(personnes);
      console.log(personnes)
    }).catch((err) => {
      res.status(500).send(err)
    });
})


  // Update personne by ID
router.put('/:id', function(req, res) {
    console.log("message update reçu")
    
    console.log(req.body._id)
    delete req.body._id;
      db.mongo
    .collection("personnes")
    .findOneAndUpdate({_id: new db.ObjectID(req.params.id)}, {$set: {"nom":req.body.nom,  "prenom": req.body.prenom, "email":req.body.email,"profession":req.body.profession,"role":req.body.role,"telephone":req.body.telephone }}, {returnOriginal: false})
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
  
  // Delete a person by ID
  router.delete('/:id', function(req, res) {
    console.log("message delete reçu")
    console.log(req.body._id)
      db.mongo
    .collection("personnes")
    .findOneAndDelete({_id: new db.ObjectID(req.params.id)})
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
module.exports = router
