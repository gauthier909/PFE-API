const Crypt = require('5no-crypt')

const cryptPassword = (password) => { 
    const digest = Crypt(password,'0.nc5.09213').encrypt(password)

    console.log("Password crypted: ", digest)
    return digest
}

const decryptPassword = (digest) => {
    console.log("Password TODEcrypted: ", digest)
    const password = Crypt(digest,'0.nc5.09213').decrypt(digest)
    console.log("Password DEcrypted: ", password)
    return password
}


module.exports.cryptPassword = cryptPassword
module.exports.decryptPassword = decryptPassword
