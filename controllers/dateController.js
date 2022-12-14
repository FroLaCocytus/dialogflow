const moment = require('moment');
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Date, Film } = require('../models/models');

class dateController {

    async getFilms(req, res){
        try {
            const {date} = req.body

            const films = await Date.findAll({
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
            let filmmap = []
            for (let i = 0; i < Object.keys(films).length; i++) {
                if (!filmmap.includes(films[i].films[0].dataValues.name)){
                    filmmap.push(films[i].films[0].dataValues.name)
                }
            }

            filmmap = filmmap.map((item) => item = `• ${item}\n`).join('')

            return res.json({
                date: moment(date).set({hour:0,minute:0,second:0,millisecond:0}),
                films: filmmap
            })

        } catch(e) {
            return res.json({message: 'Что то не так'})
        }

    }
}
module.exports = new dateController()
