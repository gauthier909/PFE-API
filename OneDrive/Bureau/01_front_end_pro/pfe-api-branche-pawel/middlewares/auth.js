const jwt = require('jsonwebtoken')
const db = require('../utils/db')
const _ =  require('lodash')
const router = require('express').Router()
const jwtSecret = process.env.JWT_SECRET
const collectionName = process.env.COLLECTION_NAME
const crypt = require('./crypt')
const authMiddleware = (req, res, next) => {
    var token = req.get('authorization')
    if (!token) {
        res.status(401).json({
            success: false,
            error: "A token is mandatory to subscibe to this API :)"
        })
    } else {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: "Unable to parse token :'("
                })
            } else if (decoded.exp < Date.now()) {
                res.status(401).json({
                    success: false,
                    error: "Token has expired >.<"
                })
            } else {
                db.mongo.collection(collectionName).findOne({ // CHNAGERRRRRRRR
                        _id: new db.ObjectID(decoded.user)
                    })
                    .then(user => {
                        if(err || !user){
                            res.status(500).send(err)
                        }else{
                            delete user.password
                            req.user = user
                            req.token = decoded
                            next()
                        }
                    })
            }
        })
    }
}

router.post("/auth/login", function(req, res, next) {
    db.db.collection("personnes").findOne({ email: req.body.user }).then(user => {
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


exports.AuthMiddleware=authMiddleware;

exports.router;
