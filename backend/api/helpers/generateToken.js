const jwt = require('jsonwebtoken')

async function generateToken(payload) {
   const token = await jwt.sign(payload, process.env.JWT_TOKEN_KEY)
   return token
}

module.exports = generateToken
