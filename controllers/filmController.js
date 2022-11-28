const { QueryTypes } = require('sequelize');
const moment = require('moment');
moment.locale('ru');

const sequelize = require('../db');
const { Film, Date, Genre } = require('../models/models');

class filmController {

    async getOne(req, res){
        
        try {
            const {name} = req.body

            const result = await Film.findOne({
                where: { name: name },
                include: [Date, Genre]
            });
            if (result == null){ 
            return res.json({
                empty: true
            })
            }
            const datemap = result.dates.map((item) => item = moment(item.date))
            const genremap = result.genres.map(item => item = item.genre)

            return res.json({
                name: result.name,
                description: result.description,
                imgurl: result.imgurl,
                dates: datemap,
                genres: genremap
            })

        } catch(e){
            return res.json({message: 'Что то не так'})
        }
    }

    async getAll(req, res){
        try {
            const films = await Film.findAll({
                attributes: ['name']
            })
            return res.json(films)
        } catch(e){
            return res.json({message: 'Что то не так'})
        }
    }

}
module.exports = new filmController()