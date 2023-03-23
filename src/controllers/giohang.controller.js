const db = require('../models/index')
const sequelize = require('sequelize')
const { dangnhap } = require('../middlewares/auth.middlewares')



class controller {
    getAll = async (req, res) => {

        try {
            let giohang = await db.GIOHANG.findOne({
                where: {
                    ID: req.user._id
                }
            })

            let result = await db.CT_GIOHANG.findAll({
                include: [
                    {
                        model: db.SANPHAM,
                        attributes: ['IDSP', 'TENSANPHAM', 'GIA'],
                        where: {
                            TRANGTHAI: true
                        }
                    },
                    {
                        model: db.KICHTHUOC,
                        attributes: ['IDKT', 'SIZE'],
                        require: true

                    },
                    {
                        model: db.MAUSAC,
                        attributes: ['IDMS', 'MAU', 'MAMAU'],
                        require: true

                    },
                ],
                where: {
                    IDGH: giohang.IDGH
                },
                attributes: ['SOLUONG'],
                require: true
            })

            if (result.length == 0) return res.json({
                result: []
            })

            console.log(result[0].dataValues.MAUSAC.dataValues.IDMS);
            let them = await db.CT_MAUSAC.findOne({
                where: {
                    IDMS: result[0].dataValues.MAUSAC.dataValues.IDMS,
                    IDSP: result[0].dataValues.SANPHAM.dataValues.IDSP
                }
            })
            console.log(them);
            result[0].dataValues.MAUSAC.dataValues.THEM = them.dataValues.THEM
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
    add = async (req, res) => {
        let { IDSP, IDMS, IDKT, SOLUONG } = req.body
        if (!IDSP || !IDMS || !IDKT || !SOLUONG) {
            return res.json({
                message: "Missing data"
            })
        }
        try {
            let giohang = await db.GIOHANG.findOne({
                where: {
                    ID: req.user._id
                }
            })
            let newProc = await db.CT_GIOHANG.create({
                IDGH: giohang.IDGH,
                IDSP: IDSP,
                IDMS: IDMS,
                IDKT: IDKT,
                SOLUONG: SOLUONG
            })

            return res.json({
                message: 'success'
            })
        } catch (error) {

            console.log(error.parent.code);
            if (error.parent.code == 23505) {
                let alterProc = await db.CT_GIOHANG.findOne({
                    where: {
                        IDGH: error.parent.parameters[0],
                        IDSP: error.parent.parameters[1],
                        IDMS: error.parent.parameters[2],
                        IDKT: error.parent.parameters[3]
                    }
                })

                alterProc.SOLUONG += parseInt(error.parent.parameters[4])
                await alterProc.save()

                return res.json({
                    message: 'success'
                })
            }

        }

    }

    editSL = async (req, res) => {
        let { IDSP, IDMS, IDKT, SOLUONG } = req.body
        if (!IDSP || !IDMS || !IDKT || !SOLUONG) {
            return res.json({
                message: "Missing data"
            })
        }
        try {
            let giohang = await db.GIOHANG.findOne({
                where: {
                    ID: req.user._id
                }
            })

            let alterProc = await db.CT_GIOHANG.findOne({
                where: {
                    IDGH: giohang.IDGH,
                    IDSP: IDSP,
                    IDMS: IDMS,
                    IDKT: IDKT
                }
            })

            alterProc.SOLUONG = parseInt(SOLUONG)
            await alterProc.save()

            return res.json({
                message: 'success'
            })
        } catch (error) {

        }
    }
}


module.exports = new controller