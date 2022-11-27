const Router = require('express')
const router = new Router()

const genreController = require('../controllers/genreController')

router.post('/films', genreController.getFilms)
router.get('/all', genreController.getAll)

module.exports = router