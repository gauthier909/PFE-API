const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
// const proxy = require('http-proxy-middleware')
const cors = require('cors')
const router = express.Router()
const io = require('socket.io')(8081)
const bodyParser= require('body-parser')
require('dotenv').config()

const db = require('./db')
const routerAuth = require('../routes/auth')
const routerEnfant = require('../routes/enfant')
const routerPersonne = require('../routes/personne')
const routerDefault = require('../routes/default')
const routerPartie = require('../routes/partie')
const routerCategorie = require('../routes/categories')
const routerBesoins = require('../routes/besoins')
const routerDominances = require('../routes/dominances')
const routerScolaritees = require('../routes/scolaritees')
const routerRelations = require('../routes/relations')
const routerRoles = require('../routes/roles')

/**
 * Variables
 */

const portHTTP = process.env.PORTHTTP
const portHTTPS = process.env.PORTHTTPS

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

db.connect()

app.use('/', routerAuth)
app.use('/enfants', routerEnfant)
app.use('/personne', routerPersonne)
app.use('/partie', routerPartie)
app.use('/categories', routerCategorie)
app.use('/besoins',routerBesoins)
app.use('/dominances',routerDominances)
app.use('/scolaritees',routerScolaritees)
app.use('/relations',routerRelations)
app.use('/roles',routerRoles)

// io.on('test', (socket) => {
//     console.log("Responding to test channel")
//     socket.emit('attente', {hello: "hello from api !!"})
// })
//
// io.on('connection', (socket) => {
//     console.log("Connection established", socket.id)
//     socket.join('room1', () => {
//         let rooms = Object.keys(socket.rooms)
//         console.log("ROOMS ! ", rooms, socket.rooms)
//     })
//     socket.in('room1').on('chat', (data) => {
//         console.log("Sur le channet chat de room1 on a recu :", data)
//         socket.to("room1").emit('chat', data)
//     })
//     socket.on('disconnect', () => {
//         console.log("A user disconnected : ", socket.id)
//     })
// })

app.use(routerDefault)

const start = (callback) => {
    http.createServer(app).listen(portHTTP, () => {
        console.info(`[Server HTTP] Listening on ${portHTTP}`)
        if (callback) callback(null)
    })
    https.createServer(app).listen(portHTTPS, () => {
        console.info(`[Server HTTPS] Listening on ${portHTTPS}`)
        if (callback) callback(null)
    })
}

module.exports.start = start