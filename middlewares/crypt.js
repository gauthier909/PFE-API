const Cryptr = require('Cryptr')
const cryptr = new Cryptr('totalyObvious')

const cryptPassword = (password) => { 
    const digest = cryptr.encrypt(password)

    console.log("Password crypted: ", digest)
    return digest
}

const decryptPassword = (digest) => {
    console.log("Password crypted: ", digest)
    const password = cryptr.decrypt(digest)
    console.log("Password crypted: ", password)
    return password
}


module.exports.cryptPassword = cryptPassword
module.exports.decryptPassword = decryptPassword
