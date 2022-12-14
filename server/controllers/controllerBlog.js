const { User, Blog, Comment } = require("../models/index")
const { Op } = require("sequelize");

class ControllerBlog {
  static async list(req, res, next) {
    const { page, title } = req.query

    let obj = {
      limit: 6,
      order: [['createdAt', "desc"]]
    }

    if (page > 1) { obj.offset = (page - 1) * obj.limit }

    if (title) {
      obj.where = {}
      obj.where.title = { [Op.substring]: title, }
    }

    const blog = await Blog.findAndCountAll(obj)
    res.status(200).json(blog)
  }

  static async add(req, res, next) {
    try {
      const { title, description, image } = req.body
      let userId = req.loginUser.id
      let count = 0
      const result = await Blog.create({ title, image, description, userId, count })

      res.status(201).json(result)
    } catch (err) {
      next(err)
    }
  }
  static async update(req, res, next) {
    try {
      const { title, description, image } = req.body
      const { id } = req.params

      const result = await Blog.update({ title, description, image }, {
        where: {
          id
        },
        returning: true
      })

      res.status(200).json(result[1])
    } catch (err) {
      next(err)
    }
  }
  static async delete(req, res, next) {
    const { id } = req.params
    const blog = await Blog.findByPk(id)
    await Blog.destroy({
      where: {
        id
      },
      returning: true
    })
    res.status(200).json("Delete successfully")
  }
  static async getById(req, res, next) {
    try {
      const { id } = req.params
      const result = await Blog.findByPk(id, {
        include: {
          model: User,
          required: true,
          attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
        }
      })
      if (result) {
        result.increment("count", { by: 1 })
        res.status(200).json(result)
      }
      else throw ({ code: 404, name: 'pageNotFound', message: 'blog not found' })
    } catch (err) {
      next(err)
    }
  }
}


module.exports = ControllerBlog