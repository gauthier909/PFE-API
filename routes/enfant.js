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


// Update an infant by ID
router.put('/:id', function(req, res) {
  console.log("message update reçu")
  
  console.log(req.body._id)
  delete req.body._id;
	db.mongo
  .collection("enfants")
  .findOneAndUpdate({_id: new db.ObjectID(req.params.id)}, {$set: {"nom":req.body.nom,  "prenom": req.body.prenom, "age":req.body.age }}, {returnOriginal: false})
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

// Delete an infant by ID
router.delete('/:id', function(req, res) {
  console.log("message delete reçu")
  console.log(req.body._id)
	db.mongo
  .collection("enfants")
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

// /api/enfant/jeu
router.get('/jeu', () => {
    
})

module.exports = router
