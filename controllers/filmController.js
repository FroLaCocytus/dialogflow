const { QueryTypes } = require('sequelize');
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


            const datemap = result.dates.map(item => item = item.date).join('\n')
            const genremap = result.genres.map(item => item = item.genre).join('\n')

            return res.json({
                name: result.name,
                description: result.description,
                imgurl: result.imgurl,
                dates: datemap,
                genres: genremap
            })

        } catch(e){
            return res.json({message: 'Такого фильма не существует, попробуйте другой;)'})
        }
    }

    async getAll(req, res){
        try {
            const films = await Film.findAll({
                attributes: ['name']
            })
            return res.json(films)
        } catch(e){
            return res.json({message: 'Лёха, ты не добавил фильмы'})
        }
    }

}
module.exports = new filmController()