const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Booking, User, Film, Date } = require('../models/models');

class bookingController {

    async updateInfo(req, res){
        try {
            const {username, film, date, count} = req.body
            let userId = 0,
                bookingId = 0
            //начальные проверки
            /**************************************************/
            if (username == undefined) return res.json({message: "username"})
            const userCheck = await User.findOne({
                where: { username: username }
            });
            if (userCheck == null) return res.json({message: "user"})
            userId = userCheck.id
            const bookingCheck = await Booking.findOne({
                where: { userId: userCheck.id }
            });
            if (bookingCheck == null) {
                const newBooking =await Booking.create(userId)
                bookingId = newBooking.id
            } else {bookingId = bookingCheck.id}
    
            //для фильма
            /**************************************************/
            if (film != undefined){
                const filmCheck = await Film.findOne({
                    where: { name: film }
                });
                if (filmCheck == null) return res.json({message: "film"})
                await Booking.update({film_name: filmCheck.name, filmId: filmCheck.id}, {where: {id: bookingId}})
            }
    
            //для даты
            /**************************************************/
            if (date != undefined){
                const dateCheck = await Date.findOne({
                    where: { date: date },
                    include: Film
                });
                if (dateCheck == null) return res.json({message: "date"})
    
                let flag = 0
                for (let i = 0; i < Object.keys(dateCheck.films).length; i++){
                    console.log(bookingCheck.filmId)
                    console.log(dateCheck.films[i].id)
                    if (bookingCheck.filmId == dateCheck.films[i].id) flag++
                }
                if (flag > 0){
                    Booking.update({date: date}, {where: {id: bookingId}})
                } else {
                    return res.json({message: "date"})
                }
                
            }
    
            //для билетов
            /**************************************************/
            if (count != undefined){
                await Booking.update({ticket_count: count}, {where: {id: bookingId}})
            }
    
            return res.json({message: true})
        } catch (e) {
            return res.json({message: 'Что то не так'})
        }

    }

    async getInfo(req, res){
        try{
            const {username} = req.body
            if (username == undefined) return res.json({message: "username"})
            const userCheck = await User.findOne({
                where: { username: username }
            });
            if (userCheck == null) return res.json({message: "user"})
            const userId = userCheck.id

            const booking = await Booking.findOne({
                where: { userId: userId }
            });
            return res.json(booking)

        } catch(e){
            return res.json({message: 'Что то не так'})
        }
    }
}
module.exports = new bookingController()