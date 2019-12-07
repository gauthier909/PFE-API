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
const fs = require('fs')


const checkImages = () => {
    let categories = []
    console.log("Dans check images")
    return new Promise((resolve, request) => {
        fs.readdir('./images', (err, dirs) => {
            dirs.forEach(dir => {
                let images = []
                path = './images/' + dir
                fs.readdir('./images/' + dir, (err, file) => {
                    let cat = {}
                    cat.categorie = dir
                    cat.src = path
                    cat.images = file
                    categories.push(cat)
                })
                console.log("et la  ? ", categories)

            })
            console.log("Mtn ? ", categories)
            resolve(categories)
        })
    })
}

const readDir = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            resolve(data)
        })
    })
}

db.connect()
    .then(db => {
        let collection = db.collection(constants.TABLE_PERSONNES)
        collection.countDocuments().then(res => {
            console.log('ok')
            if (res === 0) {
                console.log('Inserting a default user')
                let password = crypt.cryptPassword(constants.TABLE_PERSONNES_PASSWORD_ADMIN)
                collection.insertOne({
                    user: 'pika',
                    password: password
                }).catch(err => {
                    console.error("[APP] Unable to insert default user")
                })
            }
        })

        /**
         * On ajoute les idées des images dans mongoDB
         */
        let images
        const run = async () => {
            let cats = []
            let categories = await readDir('./images')
            for (let i = 0; i < categories.length; i++) {
                let abc = await readDir('./images/' + categories[i])
                let element = './images/' + categories[i]
                cats.push({
                    categorie: categories[i],
                    path: './images/' + categories[i] + '/',
                    images: abc
                })
            }
            images = cats
        }
        run()
            .then(() => {
                // console.log(images)
                images.forEach(element => {
                    element.images.forEach(image => {
                        let el = db.collection('images')
                        .find({
                            nom: element.path+image
                        }).toArray().then(arr => {
                            if(arr.length === 1){
                                if(arr[0].nom === element.path+image){
                                    console.log("C'est ok")
                                }else{
                                    console.log("pas ok ?")
                                }
                            }else if(arr.length === 0){
                                console.log("Image absente")
                            }else{
                                console.log("Plus d'une image detecté !!")
                            }
                        })
                    })
 
                })
            })
        })