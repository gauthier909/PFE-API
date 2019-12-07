const express = require('express')
const router = express.Router()
const db = require('../modules/db')


// /api/enfant/
// Find all enfants
router.get('/', (req, res) => {
  console.log("message vers enfant reçu")
    db.mongo
    .collection("enfants")
    .find()
    .toArray()
    .then(enfants => {
      res.json(enfants);
    }).catch((err) => {
		res.status(500).send(err)
	});
})

/* 
find an infant by id
*/
router.get('/:id', (req, res) => {
  console.log("message tofind with ID enfant reçu")
  db.mongo
  .collection("enfants")
  .findOne({_id: new db.ObjectID(req.params.id)})
  .then(enfants => {
    res.json(enfants);
  }).catch((err) => {
  res.status(500).send(err)
});
})
module.exports = router


// /api/enfant/jeu
router.get('/jeu', () => {
    
})

module.exports = router
