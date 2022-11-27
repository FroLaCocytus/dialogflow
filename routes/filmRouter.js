const Router = require('express')
const router = new Router()

const filmController = require('../controllers/filmController')

router.post('/one', filmController.getOne)
router.get('/all', filmController.getAll)


module.exports = router