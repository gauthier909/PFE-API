const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const db = require('./db')


/**
 * Import Routes
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

const routerProfessions = require('../routes/professions')

/**
 * Import middlewares
 */
const loggerMiddleware = require('../middlewares/auth').loggerMiddleware
const authMiddleware = require('../middlewares/auth').authMiddleware

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * Use des Middlewares
 */
// app.use(loggerMiddleware)
// app.use(authMiddleware)


/**
 * Use des Routes
 */
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
    var server = http.createServer(app)
    const io = require('socket.io').listen(server)
    let rooms = []

    io.on('connection', (socket) => {
        console.log("[SOCKET] Connection established", rooms)
        socket.on('getRooms', () => {
            console.log('[SOCKET] Les rooms ont été demandé' )
            socket.emit('getRooms', rooms)
        })
        socket.on('joinRoom', room => {
            console.log('[SOCKET] Join d\' une room demandé :', room)

            if(rooms.indexOf(room) == -1){
                rooms.push(room)
            }
            socket.join(room)
        })

        socket.on("message", ({
            room,
            message
        }) => {
            console.log("[SOCKET] Message", room, message)
            socket.to(room).emit("message", {
                message,
            })

        })
    })

    server.listen(process.env.PORT || 8080, () => {    // process.env.PORT is specified by heroku
        console.info(`[Server HTTP] Listening on ${process.env.PORT} (production) OR 8080 (dev)`)
        if (callback) callback(null)
    })
    
    // https.createServer(app).listen(8433, () => { 
    //     console.info(`[Server HTTPS] Listening on ${portHTTPS}`)
    //     if (callback) callback(null)
    // })
}

// const ioJeux = require('../sockets/socketJeu')

module.exports.start = start