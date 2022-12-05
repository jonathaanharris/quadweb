const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secretKey = "secretpokoknya"

const payloadToToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '24h' })
}

const tokenToPayload = (token) => {
  return jwt.verify(token, secretKey)
}

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(8)
  return bcrypt.hashSync(password, salt)
}

const comparePassword = (password, hashedPass) => {
  return bcrypt.compareSync(password, hashedPass)
}

module.exports = { payloadToToken, tokenToPayload, hashPassword, comparePassword }