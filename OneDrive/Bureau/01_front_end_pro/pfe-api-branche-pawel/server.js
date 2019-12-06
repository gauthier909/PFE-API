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
const auth = require('./middlewares/auth')
// app.use(proxy({target: "http://localhost:4200", secure: false}))

app.use(cors())
app.use(auth.AuthMiddleware);

app.use('/enfant', routerEnfant)
app.use('/professionnel', routerProfessionnel)
app.use('/responsable', routerResponsable)

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
