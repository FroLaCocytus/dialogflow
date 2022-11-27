const { QueryTypes } = require('sequelize');
const sequelize = require('../db');
const { Booking } = require('../models/models');

class bookingController {

    async add(req, res){
        return res.json({message:'nice'})

    }

    async getInfo(req, res){
        return res.json({message:'nice'})

    }
}
module.exports = new bookingController()