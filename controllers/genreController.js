const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Genre, Film } = require('../models/models');

class genreController {


    async getFilms(req, res){
        try {
            const {genre} = req.body

            const films = await Genre.findOne({
                where: { genre: genre },
                include: Film
            });
    
            const filmmap = films.films.map((item, index) => item = `${index+1}) ${item.name}\n`).join('')
    
            return res.json({
                genre: films.genre,
                films: filmmap
            })
        } catch(e) {
            return res.json({message: 'Фильмов в указзаном жанре нету, попробуйте другой жанр:)'})

        }


    }

    async getAll(req, res){
        const genres = await Genre.findAll({
            attributes: ['genre']
        })
        return res.json(genres)

    }
}
module.exports = new genreController()