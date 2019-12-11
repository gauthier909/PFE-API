const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const db = require('./db')

/**
 * Routes
 */
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
const routerFiltres = require('../routes/filtres')
const routerImages = require('../routes/images')
const routerDemandeur = require('../routes/demandeurs')
const routerJeux = require('../routes/jeux')

/**
 * Sockets
 */
const ioJeux = require('../sockets/socketJeu')

const routerProfessions = require('../routes/professions')

/**
 * Variables
 */

const portHTTP = process.env.PORTHTTP
const portHTTPS = process.env.PORTHTTPS

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

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
app.use('/filtres',routerFiltres)
app.use('/professions',routerProfessions)
app.use('/demandeurs',routerDemandeur)
app.use('/jeux', routerJeux)

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