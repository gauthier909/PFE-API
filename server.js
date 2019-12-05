const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const proxy = require('http-proxy-middleware')
const cors = require('cors')
const router = express.Router()
const io = require('socket.io')(8081)
const db = require('./utils/db')
require('dotenv').config()

const routerEnfant = require('./routes/enfant')
const routerPersonne = require('./routes/personne')
const routerDefault = require('./routes/default')

app.use(cors())

const constants = require("./models/modelJeux")

db.connect()

app.use('/enfant', routerEnfant)
app.use('/personne', routerPersonne)

io.on('test', (socket) => {
    console.log("Responding to test channel")
    socket.emit('attente', {hello: "hello from api !!"})
})

io.on('connection', (socket) => {
    console.log("Connection established", socket.id)
    socket.join('room1', () => {
        let rooms = Object.keys(socket.rooms)
        console.log("ROOMS ! ", rooms, socket.rooms)
    })
    socket.in('room1').on('chat', (data) => {
        console.log("Sur le channet chat de room1 on a recu :", data)
        socket.to("room1").emit('chat', data)
    })
    socket.on('disconnect', () => {
        console.log("A useRRRR disconnected : ", socket.id)
    })
})

app.use(routerDefault)



http.createServer(app).listen(8080)
// https.createServer(app).listen(8433)