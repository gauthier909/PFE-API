const app=require('express')
const router=app.Router()
const _ =  require('lodash')



const db = require('../modules/db')
const bodyParser= require('body-parser')

const crypt = require('../middlewares/crypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
router.post("/auth/login", function(req, res, next) {
    console.log(req.body);
    db.mongo.collection("personnes").findOne({ email: req.body.email }).then(user => {
        console.log(user+" avant if")
        if (user) {
            console.log("my request "+req.body.password);
                console.log(user+"mon user")
            if(crypt.decryptPassword(user.password)==req.body.password) {

                    console.log("might get there")
                    const exp = Date.now() + 12 * 60 * 60 * 1000; // 12h
                    jwt.sign({ user: user._id, exp: exp }, process.env.JWT_SECRET, (err, token) => {
                        if (err) {
                            console.log(err)
                            res.status(500).json({ success: false, error: "error during token signing" })
                        } else {
                            delete user.password
                            res.json({ success: true, user, token })
                        }
                    });
            }
                 else {
                    console.log("wrong pasword");
                    res.status(401).json({ success: false, error: "bad email/password" })
                }
            }else {
            console.log("wrong name");
            res.status(401).json({ success: false, error: "bad email/password" })
        }
        }).catch(err => {
            console.log(err)
        res.status(500).json({ success: false, error: "Unable to find 501" })})
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
                console.log(err)
                res.status(500).json({ success: false, error: "Unable to insert user into DB" })})
        }
    })
})
module.exports = router
