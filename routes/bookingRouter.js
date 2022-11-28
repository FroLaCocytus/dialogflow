const Router = require('express')
const router = new Router()

const bookingController = require('../controllers/bookingController')

router.post('/info', bookingController.getInfo)
router.post('/update', bookingController.updateInfo)

module.exports = router