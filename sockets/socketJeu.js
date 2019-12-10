const io = require('socket.io')(8081)

// IL SERAIT BIEN DE VERIFIER SI LE MSG RECU D UN PROFESSIONNEM EST BIEN UN PROFESSIONNEL IDEM CHILD
let rooms = []

io.on('connection', (socket) => {
    console.log("[SOCKET] Connection established", rooms)
    // socket.on('createRoom', (idChild) => {
    // let ajout = false
    // if(rooms){
    //     rooms.forEach((el, i) => {
    //         if (rooms[i].child) {
    //             if (rooms[i].child === idChild) {
    //                 console.log('[SOCKET] Une room de cet enfant existe déjà !')
    //                 ajout = true
    //             }
    //         }
    //     })
    //     if(!ajout){
    //         rooms[rooms.length] = {child: idChild}                                          // SAUVEGARDE DANS LA MEMOIRE DU BACKEND 
    //         socket.join(idChild)                                                            // CHAQUE SOCKET EST UNE ROOM
    //         console.log('[SOCKET] Une nouvelle room a été créée pour le child: ', idChild)
    //         ajout = true
    //     }
    // }

    // })
    socket.on('getRooms', () => {
        console.log('[SOCKET] Les rooms ont été demandé' )
        // let availableRooms = []
        // rooms.forEach((el, i) => {
        //     if (!rooms[i].professionnal && rooms[i].child) {
        //         availableRooms.push(rooms[i].child)
        //     }
        // })
        socket.emit('getRooms', rooms)
    })
    socket.on('joinRoom', room => {
        console.log('[SOCKET] Join d\' une room demandé :', room)
        // rooms.forEach((el, i) => {
        //     if( socket.rooms.length > 1) {
        //         console.log('[SOCKET] Le professionnel est déjà dans une room ! ', socket.rooms)
        //     }
        //     else if (el.child === idChild && !el.professionnal){
        //         el.professionnal = idProfessionnal
        //         console.log('[SOCKET] La room a bien été rejoind par le professionel !')
        //         socket.join(idChild)                                                            // AJOUT DU PROFESSIONNEL DANS LA ROOM DE L ENFANT
        //         socket.to(idChild).emit('joinRoom', 'Vous avez été mis dans la room désiré')    // VERIFIER SI EMIT RENVOIE JUSTE A LA PERSONNE DEMANDE
        //     }else{
        //         console.log('[SOCKET] Room non autorisé')
        //     }
        // })
        if(rooms.indexOf(room) == -1){
            rooms.push(room)
        }

        socket.join(room)
    })

    socket.on("message", ({
        room,
        message
    }) => {
        console.log("Message", room, message)
        socket.to(room).emit("message", {
            message,
        })

    })

    socket.on("choosingElement", ({
        room
    }) => {
        socket.to(room).emit("choosingElement", "Someone is choosing images !")
    })
})

module.exports.io = io