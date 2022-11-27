const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const bookingRouter = require('./bookingRouter')
const filmRouter = require('./filmRouter') 
const dateRouter = require('./dateRouter')
const genreRouter = require('./genreRouter')
const appendRouter = require('./appendRouter')


router.use('/user', userRouter)
router.use('/booking', bookingRouter)
router.use('/film', filmRouter)
router.use('/date', dateRouter)
router.use('/genre', genreRouter)
router.use('/append', appendRouter)


module.exports = router