const moment = require('moment');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Date, Film } = require('../models/models');

class dateController {

    async getFilms(req, res){
        try {
            const {date} = req.body

            const films = await Date.findOne({
                where: { 
                    date: {
                        [Op.and]: {
                            [Op.gte]: moment(date).set({hour:0,minute:0,second:0,millisecond:0}),
                            [Op.lt]: moment(date).add(1, 'days').set({hour:0,minute:0,second:0,millisecond:0})
                        }
                    }
                },
                include: Film
            });

            const filmmap = films.films.map((item, index) => item = `${index+1}) ${item.name}\n`).join('')
    
            return res.json({
                date: moment(date).set({hour:0,minute:0,second:0,millisecond:0}).format('DD MMMM YYYY', 'ru'),
                films: filmmap
            })

        } catch(e) {
            return res.json({message: 'В указанную дату, фильмов нету, попробуйте другую:)'})
        }

    }
}
module.exports = new dateController()
