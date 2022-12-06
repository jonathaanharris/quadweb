const express = require('express')
const router = express.Router()
const routerUser = require('./routerUsers')
const routerBlog = require('./routerBlogs')
const routerComment = require('./routerComments')

router.use('/users', routerUser)
router.use('/blogs', routerBlog)
router.use('/comments', routerComment)

module.exports = router