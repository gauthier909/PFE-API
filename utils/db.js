const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
require('dotenv').config()

const url = "mongodb+srv://gabriel:gabygab11@web3-mn3ae.gcp.mongodb.net/test?retryWrites=true&w=majority"
const dbName = "PFE-DB"

let connect = () => {
    return new Promise((resolve, reject) => {
        console.log("Voici nos identifiants: ", url, dbName)
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