const io = require('socket.io')(process.env.SOCKETHTTP)
console.log("[SOCKET] Port : ", process.env.SOCKETHTTP)
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

module.exports.io = io