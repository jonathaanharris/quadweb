const express = require('express')
const router = express.Router()
const routerUser = require('./routerUsers')
const routerBlog = require('./routerBlogs')
const routerComment = require('./routerComments')

router.get("/ping", async (req, res, next) => {
  res.status(200).json({ message: "pong" })
})

router.use('/users', routerUser)
router.use('/blogs', routerBlog)
router.use('/comments', routerComment)

module.exports = router