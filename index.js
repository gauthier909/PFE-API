/**
 * On vérifie si on est dans l'environnement de production ou pas
 */
if (process.env.NODE_ENV === "development") {
    require('dotenv').config()
}

/**
 * Les imports nécessaire
 */
const db = require('./modules/db')
const server = require('./modules/server')
const constants = require('./utils/constants')
const crypt = require('./middlewares/crypt')
const dbImages = require('./utils/dbImages')


db.connect()
    .then(db => {
        let collection = db.collection(constants.TABLE_PERSONNES)
        collection.countDocuments().then(res => {
            console.log('ok')
            if (res === 0) {
                console.log('Inserting a default user')
                let password = crypt.cryptPassword(constants.TABLE_PERSONNES_PASSWORD_ADMIN)
                let user = constants.TABLE_PERSONNES_USER_ADMIN
                collection.insertOne({
                    user: user,
                    password: password
                }).catch(err => {
                    console.error("[APP] Unable to insert default user")
                })
            }
        })

        /**
         * On ajoute les images dans mongoDB
         */
        dbImages.chargeImages()
    })
    .then(server.start())