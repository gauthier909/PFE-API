const mongoDb = require('../modules/db')
const fs = require('fs')


const readDir = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            resolve(data)
        })
    })
}

const chargeImages = () => {
    let db = mongoDb.mongo
    let images
    const run = async () => {
        let cats = []
        let categories = await readDir('./assets')
        for (let i = 0; i < categories.length; i++) {
            let abc = await readDir('./assets/' + categories[i])
            let element = './assets/' + categories[i]
            cats.push({
                categorie: categories[i],
                path: './assets/' + categories[i] + '/',
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
                            nom: '../.'+element.path + image
                        }).toArray().then(arr => {
                            if (arr.length === 1) {
                                if (arr[0].nom ===  '../.'+element.path + image) {
                                    // console.log("[IMAGE DANS DB]", element.path + image)
                                } else {
                                    // console.log("Erreur, vérifier code")
                                }
                            } else if (arr.length === 0) {
                                // console.log("[IMAGE ABSENTE]", element.path + image, " => INSERTION")
                                db.collection('images').insertOne({
                                    nom: '../.'+element.path + image,
                                    categorie: element.categorie
                                })
                            } else {
                                // console.log("[IMAGES MULTIPLES]", element.path + image, " => SUPPRESSION + INSERTION")
                                db.collection('images').deleteMany({
                                    nom: '../.'+element.path + image
                                })
                                db.collection('images').insertOne({
                                    nom: '../.'+element.path + image,
                                    categorie: element.categorie
                                })
                            }
                        })
                })
            })
        })
}

module.exports.chargeImages = chargeImages