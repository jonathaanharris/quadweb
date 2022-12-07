const express = require('express')
const ControllerComment = require('../controllers/controllerComment')
const authentication = require('../middleware/authentication')
const { authorizationComment } = require('../middleware/authorization')
const router = express.Router()

router.delete('/:id', authentication, authorizationComment, ControllerComment.delete)
router.post('/:blogId', authentication, ControllerComment.add)
router.get('/:blogId', ControllerComment.list)

module.exports = router