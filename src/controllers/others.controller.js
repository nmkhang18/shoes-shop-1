const db = require('../models/index')
const sequelize = require('sequelize')

class controller {
    getColor = async (req, res) => {

        try {
            let result = await db.MAUSAC.findAll({
                attributes: ["IDMS", "MAU", "MAMAU"],
            })
            return res.json({
                result
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }

    }

    getSize = async (req, res) => {

        try {
            let result = await db.KICHTHUOC.findAll({
                attributes: ["IDKT", "SIZE"],
            })
            return res.json({
                result
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }
    }

}

module.exports = new controller