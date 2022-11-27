const Router = require('express')
const router = new Router()

const bookingController = require('../controllers/bookingController')

router.post('/add', bookingController.add)
router.post('/info', bookingController.getInfo)

module.exports = router