// const { pool } = require('../configs/connectDB')
const db = require('../models/index')
const Sequelize = require('sequelize')
const { sequelize } = require('../models/index')



class controller {
    getAll = async (req, res) => {
        try {
            let result = await db.SANPHAM.findAll({
                include: {
                    model: db.NHANHIEU,
                    attributes: ["TENNHANHIEU"],
                    require: true
                },
                attributes: ["IDSP", "MOTA", "GIA"],
                where: {
                    TRANGTHAI: true
                }
            })

            return res.json({
                result
            })
        } catch (error) {
            console.log(error);
        }
    }
    getById = async (req, res) => {
        try {
            let result = await db.SANPHAM.findByPk(req.params.id, {
                include: {
                    model: db.CT_MAUSAC,
                    include: [{
                        model: db.MAUSAC,
                        attributes: ['MAU', "MAMAU"],
                        required: true
                    },
                    {
                        model: db.CT_KICHTHUOC,
                        include: {
                            model: db.KICHTHUOC,
                            attributes: ['SIZE']
                        },
                        attributes: ["SOLUONGTON", "SOLUONGDABAN", "TRANGTHAI"],
                        required: true
                    },
                    ],
                    attributes: ["THEM", "HINHANH", "TRANGTHAI"],
                    required: true

                },
                attributes: ['IDSP', 'TENSANPHAM', "GIA"],
            })

            return res.json({
                result
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: error.message,
            });
        }

    }
    editById = async (req, res) => {

    }
    disableById = async (req, res) => {

    }
    deleteById = async (req, res) => {

    }
    add = async (req, res) => {
        let { tensanpham, nhanhieu, mota, gia, MAUSAC } = req.body
        console.log(MAUSAC);
        if (!TENSANPHAM || !NHANHIEU || !MOTA || !GIA) {
            return res.json({
                message: "Missing data"
            })
        }
        try {
            const result = await sequelize.transaction(async t => {
                let sanpham = await db.SANPHAM.create({
                    TENSANPHAM: TENSANPHAM,
                    NHANHIEU: NHANHIEU,
                    MOTA: MOTA,
                    GIA: GIA
                }, { transaction: t })
                console.log(sanpham);
                MAUSAC = MAUSAC.map(item => {
                    item.IDSP = sanpham.IDSP
                    return item
                })
                KICHTHUOC = KICHTHUOC.map(item => {
                    item.IDSP = sanpham.IDSP
                    return item
                })
                console.log(MAUSAC);
                let mau = await db.CT_MAUSAC.bulkCreate(MAUSAC, { transaction: t })
                let size = await db.CT_KICHTHUOC.bulkCreate(KICHTHUOC, { transaction: t })
                return { sanpham, mau, size }

            })
            return res.json({
                result
            })

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new controller