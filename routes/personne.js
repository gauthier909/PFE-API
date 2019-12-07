const express = require('express')
const router = express.Router()
const db = require('../modules/db')
var crypt = require('password-hash')
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
    req.body.password=crypt.generate(passwordHash);
    db.mongo.collection("personnes").insertOne(req.body).then((result) =>{
      req.body._id = result.insertedId
      res.json(req.body)
    }).catch((err) => {
      res.status(500).send(err)
    });
  });

module.exports = router
