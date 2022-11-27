const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { User } = require('../models/models');

class userController {

    async adduser(req, res){
        const {name} = req.body
        const user = await User.create({name})
        return res.json(user)
    }

    async userinfo(req, res){
        const {sesion} = req.body
        const user = await User.create({name})
        return res.json(user)
    }
}
module.exports = new userController()