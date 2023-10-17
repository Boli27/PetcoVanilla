
const jwt = require('jsonwebtoken')
config = require('../config/config')

const secret = config.jwt.secret;

function asignarToken(data){
    return jwt.sign(data, secret)
}

function verificarToken(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        return null; // Si hay un error en la verificación del token, se retorna null
    }
}

module.exports ={
    asignarToken,
    verificarToken
}