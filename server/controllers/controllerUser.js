const { User, Blog, Comment } = require("../models/index")
const { comparePassword, payloadToToken, tokenToPayload } = require('../helper/secure')

class ControllerUser {
  static async register(req, res, next) {
    try {
      const { email, password, username } = req.body
      let role = 'member'
      const result = await User.create({ email, password, username, role })

      res.status(201).json({ id: result.id, email: result.email })
    } catch (err) {
      next(err)
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        res.status(401).json({ message: "invalid username or email or password" })
      }
      const detailUser = await User.findOne({ where: { email } })
      if (detailUser) {
        if (comparePassword(password, detailUser.password)) {
          const payload = { id: detailUser.id, email: detailUser.email, username: detailUser.username }
          const accessToken = payloadToToken(payload)
          res.status(200).json({ message: 'Login Successfull', acces_token: accessToken, user_role: detailUser.role })
        } else {
          throw ({ code: 401, name: 'invaliduser', message: 'invalid username or email or password' })
        }
      } else {
        throw ({ code: 401, name: 'invaliduser', message: 'invalid username or email or password' })
      }
    } catch (err) {
      next(err)
    }
  }
}
module.exports = ControllerUser