const { tokenToPayload } = require("../helper/secure")
const { User } = require("../models/index")

const authentication = async (req, res, next) => {
  try {
    const { token } = req.headers
    if (!token) {
      throw ({ code: 401, name: 'user_invalid', message: 'need login first' })
    }
    const payload = tokenToPayload(token)
    const user = await User.findByPk(payload.id)

    req.loginUser = {
      id: user.id,
      role: user.role
    }
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authentication