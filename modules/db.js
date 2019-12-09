const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
require('dotenv').config()

const url = process.env.MONGODB_URI
const dbName = process.env.MONGO_DB

let connect = () => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        client.connect((err) => {
            if(err) {
                console.error("[DB] Unable to connect to server: " + err.message)
                reject(err)
            }else{
                console.info("[DB] Connected successfully to server")
                exports.mongo = client.db(dbName)
                resolve(exports.mongo)
            }
        })
    })
}

exports.connect = connect
exports.mongo = null
exports.ObjectID = mongodb.ObjectID