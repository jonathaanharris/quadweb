const express = require('express')
const ControllerBlog = require('../controllers/controllerBlog')
const router = express.Router()
const authentication = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')

router.get('/', ControllerBlog.list)
router.post('/', authentication, ControllerBlog.add)
router.get('/:id', ControllerBlog.getById)
router.put('/:id', authentication, authorization, ControllerBlog.update)
router.delete('/:id', authentication, authorization, ControllerBlog.delete)


module.exports = router