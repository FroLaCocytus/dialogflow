const Router = require('express')
const router = new Router()

const userController = require('../controllers/userController')

router.post('/add',  userController.adduser)
router.post('/info', userController.userinfo)

module.exports = router