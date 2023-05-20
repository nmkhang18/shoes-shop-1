const db = require('../models/index')
const Sequelize = require('sequelize')
const { sequelize } = require('../models/index')
const { upload, delete1 } = require('../configs/uploadDrive')

class controller {
    add = async (req, res) => {
        if (!req.files) return res.json({
            message: 'Missing data'
        })
        console.log(req.files);
        let idDrive = await upload(res, req.files.file.data, 'temp')
        const hinh = `https://drive.google.com/uc?export=view&id=${idDrive}`
        try {
            const banner = await db.BANNER.create({
                HINHANH: hinh,
                TRANGTHAI: 1
            })
            return res.json({
                message: 'Create successfull'
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }
    }
    getAll = async (req, res) => {
        try {
            let result = await db.BANNER.findAll({
                attributes: ['ID', 'HINHANH', 'TRANGTHAI'],
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
    enable = async (req, res) => {
        try {
            let result = await db.BANNER.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })
            result.TRANGTHAI = 1
            await result.save()

            return res.json({
                message: 'Update successfull'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }

    }
    disable = async (req, res) => {
        try {
            let result = await db.BANNER.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })
            result.TRANGTHAI = 0
            await result.save()

            return res.json({
                message: 'Update successfull'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }

    }
}


module.exports = new controller