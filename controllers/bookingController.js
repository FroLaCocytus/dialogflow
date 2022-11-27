const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Booking } = require('../models/models');

class bookingController {

    async add(req, res){
        try {
            const {info, userId, filmId} = req.body
            const booking = await Booking.create({info, userId, filmId})
            return res.json(booking)
        } catch(e) {
            return res.json({message: 'booking уже есть'})
        }
    }

    async getInfo(req, res){
        try{
            const {userId} = req.body
            const booking = await Booking.findOne({
                where: { userId: userId }
            });
            return res.json(booking)

        } catch(e){
            return res.json({booking: null})
        }
    }
}
module.exports = new bookingController()