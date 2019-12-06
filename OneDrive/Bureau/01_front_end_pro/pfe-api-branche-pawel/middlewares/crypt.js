const simplecrypt = require('simplecrypt')
const sc = simplecrypt()

const cryptPassword = (password) => {
    const digest = sc.encrypt(password)
    console.log("Password crypted: ", digest)
    return digest
}

const decryptPassword = (digest) => {
    const password = sc.decrypt(digest)
    console.log("Password decrypted: ", password)
    return password
}

module.exports.cryptPassword = cryptPassword
module.exports.decryptPassword = decryptPassword
