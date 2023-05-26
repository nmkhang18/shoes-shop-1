const db = require('../models/index')
const Sequelize = require('sequelize')
const { sequelize } = require('../models/index')

class controller {
    getAll = async (req, res) => {
        try {
            let result = await db.THONGBAO.findAll({
                attributes: ['TIEUDE', 'NOIDUNG', 'createdAt'],
                where: {
                    TRANGTHAI: true
                },
                order: [['createdAt', 'DESC']]
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