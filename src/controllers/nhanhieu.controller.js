// const { pool } = require('../configs/connectDB')
const db = require('../models/index')
const sequelize = require('sequelize')
// let multerConfig = require('../configs/multerConfig');
const { upload, delete1 } = require('../configs/uploadDrive')


class controller {
    getAll = async (req, res) => {

        try {
            let result = await db.NHANHIEU.findAll({
                attributes: ['IDNH', 'TENNHANHIEU', 'MOTA', 'HINH', 'TRANGTHAI'],
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
            let result = await db.NHANHIEU.findByPk(req.params.id, {
                attributes: ['IDNH', 'TENNHANHIEU', 'MOTA', 'HINH', 'TRANGTHAI'],
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

        // let uploadFile = multerConfig('images')
        // uploadFile(req, res, async (error) => {
        let { tennhanhieu, mota, trangthai } = req.body
        if (!tennhanhieu || !mota || !trangthai || !req.files) return res.json({
            message: 'Missing data'
        })
        console.log(req.files);


        try {
            let result = await db.NHANHIEU.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })

            let idDrive = await upload(res, req.files.file.data, req.body.tennhanhieu)
            // console.log(id);
            const hinh = `https://drive.google.com/uc?export=view&id=${idDrive}`
            result.TENNHANHIEU = tennhanhieu
            result.MOTA = mota
            result.HINH = hinh
            result.TRANGTHAI = trangthai

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
        // })


    }
    disableById = async (req, res) => {
        try {
            let result = await db.NHANHIEU.findByPk(req.params.id)
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
            let result = await db.NHANHIEU.findByPk(req.params.id)
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
        // let uploadFile = multerConfig('images')
        // uploadFile(req, res, async (error) => {
        //     let { tennhanhieu, mota, trangthai } = req.body
        //     if (!tennhanhieu || !mota || !trangthai || !req.file) return res.json({
        //         message: 'Missing data'
        //     })
        //     console.log(req.file);
        //     if (error) {
        //         return res.status(440).json({
        //             status: 400,
        //             message: error,

        //         });
        //     }

        //     let idDrive = await upload(res, req.body.tennhanhieu)
        //     // console.log(id);
        //     const hinh = `https://drive.google.com/uc?export=view&id=${idDrive}`

        //     try {
        //         const nhanhieu = await db.NHANHIEU.create({
        //             TENNHANHIEU: tennhanhieu,
        //             MOTA: mota,
        //             HINH: hinh,
        //             TRANGTHAI: trangthai
        //         })
        //         return res.json({
        //             message: 'Create successfull'
        //         })

        //     } catch (error) {
        //         console.log(error);
        //         return res.status(500).json({
        //             status: 500,
        //             message: 'Unsuccess',
        //         });
        //     }
        // })
        let { tennhanhieu, mota } = req.body
        if (!tennhanhieu || !mota || !req.files) return res.json({
            message: 'Missing data'
        })
        console.log(req.files);

        let idDrive = await upload(res, req.files.file.data, req.body.tennhanhieu)
        // console.log(id);
        const hinh = `https://drive.google.com/uc?export=view&id=${idDrive}`

        try {
            const nhanhieu = await db.NHANHIEU.create({
                TENNHANHIEU: tennhanhieu,
                MOTA: mota,
                HINH: hinh,
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
}

module.exports = new controller