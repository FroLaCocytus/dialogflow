const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Booking, User, Film, Date } = require('../models/models');

class bookingController {

    async updateInfo(req, res){
        //try {
            const {username, film, date, count, confirmed} = req.body
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
                const newBooking =await Booking.create({userId: userId})
                bookingId = newBooking.id
            } else {
                bookingId = bookingCheck.id
            }
            console.log(`id юзера: ${userId} id брони ${bookingId}`)
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
                if (dateCheck == null) return res.json({message: "datefilm", film: bookingCheck.film_name})
                const bookingVitas = await Booking.findOne({
                    where: { userId: userCheck.id }
                });

                let flag = 0
                for (let i = 0; i < Object.keys(dateCheck.films).length; i++){
                    console.log(bookingVitas.filmId)
                    console.log(dateCheck.films[i].id)
                    if (bookingVitas.filmId == dateCheck.films[i].id) flag++
                }
                if (flag > 0){
                    Booking.update({date_info: date}, {where: {id: bookingId}})
                } else {
                    return res.json({message: "datefilm", film: bookingVitas.film_name})
                }
                
            }
    
            //для билетов
            /**************************************************/
            if (count != undefined){
                await Booking.update({ticket_count: count}, {where: {id: bookingId}})
            }

            //для подтверждения
            /**************************************************/
            if (confirmed != undefined){
                console.log(typeof confirmed)
                if (confirmed == true){
                    await Booking.update({is_confirmed: confirmed}, {where: {id: bookingId}})
                } else {
                    const deleteBooking = await Booking.destroy({ where: { id: bookingId } })
                    if (deleteBooking != null) {
                        return res.json({message: 'deleted'})
                    } else {
                        return res.json({message: 'not deleted'})
                    }
                }
            }
    
            return res.json({message: true})
       // } catch (e) {
       //     return res.json({message: 'Что то не так'})
       // }

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
            return res.json({
                film: booking.film_name,
                data: booking.date_info,
                ticket: booking.ticket_count,
                confirmed: booking.is_confirmed,
            })

        } catch(e){
            return res.json({message: 'Что то не так'})
        }
    }

    async delete(req, res){
        try{
            const {username} = req.body
            if (username == undefined) return res.json({message: "username"})
            const userCheck = await User.findOne({
                where: { username: username }
            });
            if (userCheck == null) return res.json({message: "user"})
            const userId = userCheck.id

            const deleteBooking = await Booking.destroy({ where: { userId: userId } })
            if (deleteBooking != null) {
                return res.json({message: 'deleted'})
            } else {
                return res.json({message: 'not deleted'})
            }

        } catch(e){
            return res.json({message: 'Что то не так'})
        }
    }
}
module.exports = new bookingController()