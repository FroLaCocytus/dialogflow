const Router = require('express')
const router = new Router()

const userController = require('../controllers/userController')

router.post('/add',  userController.adduser)
router.post('/check', userController.checkuser)

module.exports = router