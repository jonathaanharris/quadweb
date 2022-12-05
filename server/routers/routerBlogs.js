const express = require('express')
const ControllerBlog = require('../controllers/controllerBlog')
const router = express.Router()
const authentication = require('../middleware/authentication')
const { authorization } = require('../middleware/authorization')
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

router.get('/', ControllerBlog.list)
router.post('/', authentication, upload.single('image'), ControllerBlog.add)
// router.get('/user/:userId', ControllerBlog.ListByUserId)
router.get('/:id', ControllerBlog.getById)
router.put('/:id', authentication, authorization, ControllerBlog.update)
router.delete('/:id', authentication, authorization, ControllerBlog.delete)


module.exports = router