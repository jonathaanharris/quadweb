const { User, Blog, Comment } = require("../models/index")
const { Op } = require("sequelize");

class ControllerComment {
  static async add(req, res, next) {
    try {
      //userId:integer,blogId:integer,text:text
      let userId = req.loginUser.id
      const { blogId } = req.params
      const { text } = req.body

      const result = await Comment.create({ userId, blogId, text })
      res.status(200).json(result)
    } catch (err) {
      next(err)
    }
  }

  // static async update(req, res, next) {
  //   try {
  //     const { id } = req.params
  //     const { text } = req.body

  //     const find = await Comment.findByPk(id)
  //     if (!find) throw ({ code: 404, name: 'pageNotFound', message: 'blog not found' })

  //     const result = await Comment.update({ text }, {
  //       where: {
  //         id
  //       },
  //       returning: true
  //     })
  //     res.status(200).json(result[1])
  //   } catch (err) {
  //     next(err)
  //   }
  // }
  static async delete(req, res, next) {
    const { id } = req.params
    await Comment.destroy({
      where: {
        id
      },
      returning: true
    })
    res.status(200).json("delete successfully")
  }
  static async list(req, res, next) {
    const { blogId } = req.params
    const result = await Comment.findAll({
      include: {
        model: User,
        required: true,
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
      }, where: {
        blogId
      }
    })
    res.status(200).json(result)
  }
}
module.exports = ControllerComment