const jwt = require('jsonwebtoken')
const db = require('../modules/db')
const crypt = require('./crypt')

const jwtSecret = process.env.JWT_SECRET
const collectionPersonnes = process.env.COLLECTION_PERSONNES

/**
 * Authentication
 * Create an authorization middleware to be used on the route to be secured
 * @param {*} req
 * @param {*} res 
 * @param {*} next 
 */
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
                db.mongo.collection(collectionPersonnes).findOne({
                        _id: new db.ObjectID(decoded.user)
                    })
                    .then(user => {
                        if (err || !user) {
                            res.status(500).send(err)
                        } else {
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

/**
 * Logger
 */
const loggerMiddleware = (req, res, next) => {
    console.log(`[${req.method}] ${req.url}`)
    next()
}

exports.loggerMiddleware = loggerMiddleware
exports.authMiddleware = authMiddleware;