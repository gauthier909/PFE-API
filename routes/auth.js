const app=require('express')
const router=app.Router()
const _ =  require('lodash')
const db = require('../utils/db')
const bodyParser= require('body-parser')
const crypt = require('../middlewares/crypt')
router.post("/login", function(req, res, next) {
    db.mongo.collection("personnes").findOne({ email: req.body.user }).then(user => {
        if (user) {
            crypt.cryptPassword(req.body.password, user.password, function(err, result) {
                if (result) {
                    const exp = Date.now() + 12 * 60 * 60 * 1000; // 12h
                    jwt.sign({ user: user._id, exp: exp }, jwtSecret, (err, token) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ success: false, error: "error during token signing" })
                        } else {
                            delete user.password
                            res.json({ success: true, user, token })
                        }
                    });
                } else {
                    res.status(401).json({ success: false, error: "bad email/password" })
                }
            })
        } else {
            res.status(401).json({ success: false, error: "bad email/password" })
        }
    })
})

router.post('/register',function (req , res, next) {
    console.log('c ici',req.body);
    db.mongo.collection("personnes").findOne({ email: req.body.user }).then(user => {
        if(user){
            res.json("impossible de register erreur inconue");
            res.status(400)
        }else{

            const usr = _.cloneDeep(req.body)

            usr.password=crypt.cryptPassword(usr.password);
            db.mongo.collection("personnes").insertOne(usr).then(res => {
                res.status(200);
            }).catch(err => {
                res.status(500).json({ success: false, error: "Unable to insert user into DB" })})
        }
    })
})
module.exports = router
