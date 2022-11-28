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
            return res.json({empty: null})
        }
    }

    async checkuser(req, res){
        try {
            const {username} = req.body
            const user = await User.findOne({
                where: { username: username }
            });
            if (user != null){
                return res.json({
                    user: true
                })
            } else {
                return res.json({
                    user: false
                }) 
            }
        } catch (e) {
            return res.json({empty: null})
        }

    }
}
module.exports = new userController()