const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})


const Booking = sequelize.define('booking',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    info: {type: DataTypes.STRING},
})

const Film = sequelize.define('film',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.TEXT},
    imgurl: {type: DataTypes.STRING},
})

const Date = sequelize.define('date',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE, unique: true},
})

const Genre = sequelize.define('genre',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    genre: {type: DataTypes.STRING, unique: true},
})

const FilmDate = sequelize.define('film_date',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

const FilmGenre = sequelize.define('film_genre',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})

User.hasOne(Booking)
Booking.belongsTo(User)

Booking.hasOne(Film)
Film.belongsTo(Booking)

Film.belongsToMany(Date, {through: FilmDate})
Date.belongsToMany(Film, {through: FilmDate})

Film.belongsToMany(Genre, {through: FilmGenre})
Genre.belongsToMany(Film, {through: FilmGenre})

module.exports = {
    User,
    Booking,
    Film,
    Date,
    Genre,
    FilmDate,
    FilmGenre
}