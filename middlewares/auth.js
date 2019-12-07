const jwt = require('jsonwebtoken')
const db = require('../utils/db')

const jwtSecret = process.env.JWT_SECRET
const collectionName = process.env.COLLECTION_NAME

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
                db.mongo.collection("").findOne({
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