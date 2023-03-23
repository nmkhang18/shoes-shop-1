// const { pool } = require('../configs/connectDB')
const db = require('../models/index')
const sequelize = require('sequelize')


class controller {
    getAll = async (req, res) => {

        try {
            let result = await db.DANHMUCSANPHAM.findAll({
                attributes: ['IDDM', 'TENDANHMUC', 'MOTA', 'TRANGTHAI'],
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
    getById = async (req, res) => {
        try {
            let result = await db.DANHMUCSANPHAM.findByPk(req.params.id, {
                attributes: ['IDDM', 'TENDANHMUC', 'MOTA', 'TRANGTHAI'],
            })
            if (!result) return res.json({
                message: 'Not found'
            })

            return res.json({
                result
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }
    }
    editById = async (req, res) => {
        let { tendanhmuc, mota, trangthai } = req.body
        if (!tendanhmuc || !mota || !trangthai) return res.json({
            message: 'Missing data'
        })
        try {
            let result = await db.DANHMUCSANPHAM.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })

            result.TENDANHMUC = tendanhmuc
            result.MOTA = mota
            result.TRANGTHAI = trangthai

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
    disableById = async (req, res) => {
        try {
            let result = await db.DANHMUCSANPHAM.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })

            result.TRANGTHAI = trangthai

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
        try {
            let result = await db.DANHMUCSANPHAM.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })



            await result.destroy()

            return res.json({
                message: 'Delete successfull'
            })
        }
        catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }

    }
    add = async (req, res) => {
        let { tendanhmuc, mota } = req.body
        if (!tendanhmuc || !mota) return res.json({
            message: 'Missing data'
        })
        try {
            const danhmuc = await db.DANHMUCSANPHAM.create({
                TENDANHMUC: tendanhmuc,
                MOTA: mota,
                TRANGTHAI: 1
            })
            return res.json({
                message: 'Create successfull'
            })

        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });

        }
    }
}

module.exports = new controller