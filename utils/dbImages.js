const mongoDb = require('../modules/db')
const fs = require('fs')


const readDir = (path) => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            resolve(data)
        })
    })
}

// const checkImages = () => {
//     let categories = []
//     console.log("Dans check images")
//     return new Promise((resolve, request) => {
//         fs.readdir('./images', (err, dirs) => {
//             dirs.forEach(dir => {
//                 let images = []
//                 path = './images/' + dir
//                 fs.readdir('./images/' + dir, (err, file) => {
//                     let cat = {}
//                     cat.categorie = dir
//                     cat.src = path
//                     cat.images = file
//                     categories.push(cat)
//                 })
//                 console.log("et la  ? ", categories)

//             })
//             console.log("Mtn ? ", categories)
//             resolve(categories)
//         })
//     })
// }

const chargeImages = () => {
    let db = mongoDb.mongo
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
                            nom: element.path + image
                        }).toArray().then(arr => {
                            if (arr.length === 1) {
                                if (arr[0].nom === element.path + image) {
                                    console.log("[OK]", element.path + image)
                                } else {
                                    console.log("pas ok ?")
                                }
                            } else if (arr.length === 0) {
                                console.log("[IMAGE ABSENTE]", element.path + image, " => INSERTION")
                                db.collection('images').insertOne({
                                    nom: element.path + image,
                                    categorie: element.categorie
                                })
                            } else {
                                console.log("[IMAGES MULTIPLES]", element.path + image, " => SUPPRESSION + INSERTION")
                                db.collection('images').deleteMany({
                                    nom: element.path + image
                                })
                                db.collection('images').insertOne({
                                    nom: element.path + image,
                                    categorie: element.categorie
                                })
                            }
                        })
                })
            })
        })
}

module.exports.chargeImages = chargeImages