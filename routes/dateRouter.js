const Router = require('express')
const router = new Router()

const dateController = require('../controllers/dateController')

router.post('/films', dateController.getFilms)

module.exports = router