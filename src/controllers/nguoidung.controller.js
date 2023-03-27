// const { pool } = require('../configs/connectDB')
const db = require('../models/index')
const Sequelize = require('sequelize')
const { sequelize } = require('../models/index')



class controller {
    getAll = async (req, res) => {
        try {
            let result = await db.TAIKHOAN.findAll({
                attributes: ['ID', 'TENNGUOIDUNG', 'EMAIL', 'SDT', 'createdAt', 'TRANGTHAI']
            })


            return res.json({
                result
            })
        } catch (error) {
            console.log(error);
        }
    }

    disableById = async (req, res) => {
        try {
            let result = await db.TAIKHOAN.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })

            console.log(result);

            result.TRANGTHAI = 'false'

            console.log(result);
            await result.save()

            return res.json({
                message: 'Update successfull'
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }
    }
    deleteById = async (req, res) => {

    }
}

module.exports = new controller