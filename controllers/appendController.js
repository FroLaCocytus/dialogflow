const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Film, Date, Genre } = require('../models/models');

class appendController {

    async addFilm(req, res){
        try {
            const {name, description, imgurl, date, genre} = req.body
            const film = await Film.create({ name: name, description: description, imgurl: imgurl })
            
            for (let i = 0; i < Object.keys(date).length; i++) { 
                console.log(i)

                const res = await Date.findOne({where: { date: date [i]}})
                if (res == null) {
                    const val = await Date.create({ date: date[i]})
                    await film.addDate(val)
                } else {
                    await film.addDate(res)
                }

            }

            for (let i = 0; i < Object.keys(genre).length; i++) { 
                const res = await Genre.findOne({where: { genre: genre[i]}})
                if (res == null) {
                    const val = await Genre.create({ genre: genre[i]})
                    await film.addGenre(val)
                } else {
                    await film.addGenre(res);
                }
            }

            const result = await Film.findOne({
                where: { name: name },
                include: [Date, Genre]
            });

            return res.json(result)
        } catch (e) {
            return res.json({message: 'Фильм уже есть'})
        }

    }
}
module.exports = new appendController()
