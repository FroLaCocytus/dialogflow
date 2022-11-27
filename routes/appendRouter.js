const Router = require('express')
const router = new Router()

const appendController = require('../controllers/appendController')

router.post('/',  appendController.addFilm)
//router.post('/info', userController.userinfo)

module.exports = router