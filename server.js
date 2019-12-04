const express = require('express')
const app = express()
const http = require('http')
const https = require('https')
const proxy = require('http-proxy-middleware')
const cors = require('cors')
const router = express.Router()
const io = require('socket.io')(8081)

const routerEnfant = require('./routes/enfant')
const routerProfessionnel = require('./routes/professionnel')
const routerResponsable = require('./routes/responsable')
const routerDefault = require('./routes/default')

// app.use(proxy({target: "http://localhost:4200", secure: false}))

app.use(cors())

app.use('/enfant', routerEnfant)
app.use('/professionnel', routerProfessionnel)
app.use('/responsable', routerResponsable)

io.on('test', (socket) => {
    console.log("Responding to test channel")
    socket.emit('attente', {hello: "hello from api !!"})
})

io.on('connection', (socket) => {
    console.log("Connection established", socket.id)
    socket.on('chat', (data) => {
        console.log("Sur le channet chat on a recu :", data)
        socket.emit('chat', {message : "Welcome back !"})
    })
})

app.use(routerDefault)



http.createServer(app).listen(8080)
// https.createServer(app).listen(8433)