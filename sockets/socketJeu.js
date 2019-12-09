const io = require('socket.io')(8081)

io.on('connection', (socket) => {
    console.log("Connection established", socket.id)
    socket.on('createRoom', (idChild) => {
        console.log('Une demande de creation de room par enfant : ', idChild)
    })
    socket.on('getRooms', (idProfessionnal) => {
        console.log('Les rooms ont été demandé par :', idProfessionnal)
    })


    // socket.on('professionnel', () => {
    //     if(generateRoom(socket.id, 'professionnel')){

    //     }else{
    //         joinRoom(socket.id)
    //     }
    // })
    // socket.on('child', () => {
    //     if(generateRoom(socket.id, 'child')){

    //     }else{
    //         joinRoom(socket.id)
    //     }
    // })
    // socket.join(generateRoom(), () => {
    //     let rooms = Object.keys(socket.rooms)
    //     console.log("ROOMS ! ", rooms, socket.rooms)
    // })
    // socket.in('room1').on('chat', (data) => {
    //     console.log("Sur le channet chat de room1 on a recu :", data)
    //     socket.to("room1").emit('chat', data)
    // })
    // socket.on('disconnect', () => {
    //     console.log("A user disconnected : ", socket.id)
    // })
})

let rooms = [], roomCount



const generateRoom = (socketId, person) => {
    roomCount = rooms.length    
    rooms[rooms.length] = {name: roomCount, [person]: socketId}
}
module.exports.io = io