const express = require('express')
const router = express.Router()
const db = require('../modules/db')

// /jeux/
// Find all jeux
router.get('/', (req, res) => {
    console.log("message get all jeux jeux reçu")
    db.mongo
      .collection("jeux")
      .find()
      .toArray()
      .then(jeux => {
        res.json(jeux);
      }).catch((err) => {
        res.status(500).send(err)
      });
  })

  router.post('/', (req, res) => {
    console.log("message on veut insert partie reçu")
    db.mongo.collection("jeux").insertOne(req.body).then((result) => {
      req.body._id = result.insertedId
      res.json(req.body)
    }).catch((err) => {
      res.status(500).send(err)
    });
  });


  // /jeux/
// Find jeu from ID
router.get('/:id', (req, res) => {
    console.log("message get jeu from ID reçu")
    db.mongo
      .collection("jeux")
      .findOne({ _id: new db.ObjectID(req.params.id) })
      .then(jeux => {
        res.json(jeu);
      }).catch((err) => {
        res.status(500).send(err)
      });
  })




  // /jeux/
// Find jeu from ID
router.get('/enfant/:nom', (req, res) => {
    console.log("message get jeux from nom enfant reçu")
    db.mongo
      .collection("jeux")
      .find({ nomEnfant: req.params.nomEnfant })
      .toArray()
      .then(jeux => {
        res.json(jeu);
      }).catch((err) => {
        res.status(500).send(err)
      });
  })

  

  // /jeux/
// Find jeu from ID
router.get('/enfant/:nom', (req, res) => {
    console.log("message get jeux from nom enfant reçu")
    db.mongo
      .collection("jeux")
      .find({ nomEnfant: req.params.nomEnfant })
      .toArray()
      .then(jeux => {
        res.json(jeu);
      }).catch((err) => {
        res.status(500).send(err)
      });
  })



// Update a jeu by ID
router.put('/:id', function (req, res) {
    console.log("message update jeux reçu")
  
    console.log(req.body._id)
    delete req.body._id;
    console.log(req.body.besoins);
    db.mongo
      .collection("jeux")
      .findOneAndUpdate({ _id: new db.ObjectID(req.params.id) }, {
        $set: {
          "demandeur": req.body.nom,
          "mandat": req.body.mandat,
          "nom_enfant": req.body.nomEnfant,
          "enfant": req.body.enfant,
          "professionnel": req.body.professionnel
        }
      }, { returnOriginal: false })
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
  
// Delete a jeux by ID
router.delete('/:id', function (req, res) {
    console.log("message delete jeux reçu")
    console.log(req.body._id)
    db.mongo
      .collection("jeux")
      .findOneAndDelete({ _id: new db.ObjectID(req.params.id) })
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
