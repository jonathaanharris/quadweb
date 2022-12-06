const { Blog, Comment } = require("../models/index")

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params
    const blog = await Blog.findByPk(id)
    if (!blog) throw ({ code: 404, name: 'dataNotFound', message: 'blog not found' })

    if (req.loginUser.id == blog.dataValues.userId) {
      next()
    } else {
      throw ({ code: 403, name: 'UNAUTHORIZED', message: 'USER UNAUTHORIZED' })
    }
  } catch (err) {
    next(err)
  }
}

const authorizationComment = async (req, res, next) => {
  try {
    const { id } = req.params

    const comment = await Comment.findByPk(id)
    if (!comment) throw ({ code: 404, name: 'dataNotFound', message: 'comment not found' })

    if (req.loginUser.id == comment.dataValues.userId) {
      next()
    } else {
      throw ({ code: 403, name: 'UNAUTHORIZED', message: 'USER UNAUTHORIZED' })
    }
  } catch (err) {
    next(err)
  }
}


module.exports = { authorization, authorizationComment } 