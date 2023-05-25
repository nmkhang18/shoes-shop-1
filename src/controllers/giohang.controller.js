const db = require('../models/index')
const Sequelize = require('sequelize')
const { sequelize } = require('../models/index')

const { dangnhap } = require('../middlewares/auth.middlewares')
const Op = Sequelize.Op


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
                        },
                        require: true
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
                    {
                        model: db.CT_MAUSAC,
                        attributes: ['IDSP', 'IDMS', 'THEM', 'HINHANH'],
                        where: {
                            IDMS: { [Op.col]: 'CT_GIOHANG.IDMS' }
                        },
                        require: true
                    }
                ],
                where: {
                    IDGH: giohang.IDGH
                },
                attributes: ['SOLUONG',],
                require: true
            })

            if (result.length == 0) return res.json({
                result: []
            })


            for (let i = 0; i < result.length; i++) {
                console.log(result[i].SANPHAM.IDSP);
            }

            result = await Promise.all(result.map(async result1 => {
                let records2 = await sequelize.query(`SELECT "SOLUONGTON"
                                                FROM PUBLIC."CT_KICHTHUOC"
                                                WHERE "IDSP" = ${result1.SANPHAM.IDSP} AND "IDMS" = ${result1.MAUSAC.IDMS} AND "IDKT" = ${result1.KICHTHUOC.IDKT}`, {
                    nest: true,
                    type: Sequelize.QueryTypes.SELECT
                });

                console.log(records2[0].SOLUONGTON);

                result1.dataValues.SOLUONGTON = records2[0].SOLUONGTON
                return result1
            })
            )
            console.log(result);
            // let them = await db.CT_MAUSAC.findOne({
            //     where: {
            //         IDMS: result[0].dataValues.MAUSAC.dataValues.IDMS,
            //         IDSP: result[0].dataValues.SANPHAM.dataValues.IDSP
            //     }
            // })
            // console.log(them);
            // result[0].dataValues.MAUSAC.dataValues.THEM = them.dataValues.THEM

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
    deleteGH = async (req, res) => {
        let { IDSP, IDMS, IDKT } = req.body
        if (!IDSP || !IDMS || !IDKT) {
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

            let proc = await db.CT_GIOHANG.findOne({
                where: {
                    IDGH: giohang.IDGH,
                    IDSP: IDSP,
                    IDMS: IDMS,
                    IDKT: IDKT
                }
            })

            await proc.destroy()

            return res.json({
                message: 'success'
            })
        } catch (error) {

        }

    }
}


module.exports = new controller