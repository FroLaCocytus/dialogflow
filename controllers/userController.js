const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { User } = require('../models/models');

class userController {

    async adduser(req, res){
        try {
            const {name, username} = req.body

            const user = await User.create({name, username})
            return res.json(user)
        } catch(e) {
            return res.json({message: 'user уже есть'})
        }
    }

    async checkuser(req, res){
        try {
            const {username} = req.body
            const user = await User.findOne({
                where: { username: username }
            });
    
            return res.json(user)
        } catch (e) {
            return res.json({user: null})
        }

    }
}
module.exports = new userController()