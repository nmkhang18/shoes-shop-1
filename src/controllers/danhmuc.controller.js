// const { pool } = require('../configs/connectDB')
const db = require('../models/index')
const Sequelize = require('sequelize')
const { sequelize } = require('../models/index')


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
        console.log(req.body);
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
    addDM_SP = async (req, res) => {

        if (!req.body.CTDM) {
            return res.json({
                message: 'missing data'
            })
        }

        let temp = JSON.parse(req.body.CTDM)

        // CTDM = CTDM.map(result => {
        //     result.IDSP
        //     result.IDDM = req.params.id
        //     return result
        // })

        let CTDM = []

        for (let i = 0; i < temp.length; i++) {
            CTDM.push({ "IDDM": req.params.id, "IDSP": temp[i] })
        }


        try {
            const DMSP = await db.CT_DANHMUC.bulkCreate(CTDM)
            return res.json({
                DMSP
            })
        } catch (error) {
            console.log(error);
        }
    }
    deleteDM_SP = async (req, res) => {

        if (!req.body.CTDM) {
            return res.json({
                message: 'missing data'
            })
        }
        let CTDM = JSON.parse(req.body.CTDM)

        try {
            const DMSP = await db.CT_DANHMUC.destroy({
                where: {
                    IDDM: req.params.id,
                    IDSP: CTDM
                }
            })



            return res.json({
                DMSP
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new controller