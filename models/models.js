const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING, unique: true},
})


const Booking = sequelize.define('booking',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    film_name: {type: DataTypes.STRING},
    date_info: {type: DataTypes.DATE},
    ticket_count: {type: DataTypes.INTEGER}
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

Film.hasOne(Booking)
Booking.belongsTo(Film)

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