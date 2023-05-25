const db = require('../models/index')
const Sequelize = require('sequelize')
const { dangnhap } = require('../middlewares/auth.middlewares')
const Op = Sequelize.Op
const { createId } = require('../helpers/helpers')
const { sequelize } = require('../models/index')




class controller {

    getAll = async (req, res) => {

        try {

            let donhang = await db.DONHANG.findAll({
                include: {
                    model: db.CT_DONHANG,
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
                                IDMS: { [Op.col]: 'CT_DONHANGs.IDMS' }
                            },
                            require: true
                        }
                    ],
                    attributes: ['SOLUONG'],
                    required: true
                },
                where: {
                    ID: req.user._id
                },
                attributes: ['IDDH', 'DIACHINHAN', 'TEN', 'SDT', 'EMAIL', 'PT_THANHTOAN', 'createdAt', 'TRANGTHAI']
            })


            return res.json({ donhang })
        } catch (error) {
            console.log(error);
        }


    }
    add = async (req, res) => {

        let { DIACHINHAN, TEN, SDT, EMAIL, PTTT } = req.body

        let CTSP = JSON.parse(req.body.CTSP)

        console.log(CTSP);

        try {
            const result = await sequelize.transaction(async t => {
                let donhang = await db.DONHANG.create({
                    IDDH: createId(),
                    DIACHINHAN: DIACHINHAN,
                    TEN: TEN,
                    SDT: SDT,
                    EMAIL: EMAIL,
                    PT_THANHTOAN: PTTT,
                    TRANGTHAI: 'Đặt hàng thành công',
                    ID: req.user._id
                }, { transaction: t })

                CTSP = CTSP.map(item => {
                    item.IDDH = donhang.IDDH
                    return item
                })


                let ct = await db.CT_DONHANG.bulkCreate(CTSP, { transaction: t })

                for (let i = 0; i < CTSP.length; i++) {
                    let ctkt = await db.CT_KICHTHUOC.findOne({
                        where: {
                            IDSP: CTSP[i].IDSP,
                            IDMS: CTSP[i].IDMS,
                            IDKT: CTSP[i].IDKT
                        }
                    })
                    ctkt.SOLUONGTON -= CTSP[i].SOLUONG
                    ctkt.SOLUONGDABAN += CTSP[i].SOLUONG
                    await ctkt.save()
                }


                return { donhang, ct }

            })

            if (result) {
                return res.json({
                    message: 'success'
                })
            }

            return res.json({
                message: 'failed'
            })
        } catch (error) {
            return res.json({
                message: 'failed'
            })
        }
    }
    cancelDH = async (req, res) => {
        try {
            let result = await db.DONHANG.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })
            result.TRANGTHAI = 'Đã hủy'
            await result.save()
            return res.json({
                message: 'success'
            })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }
    }

    getAllAdm = async (req, res) => {

        try {

            let donhang = await db.DONHANG.findAll({
                include: {
                    model: db.CT_DONHANG,
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
                                IDMS: { [Op.col]: 'CT_DONHANGs.IDMS' }
                            },
                            require: true
                        }
                    ],
                    attributes: ['SOLUONG'],
                    required: true
                },
                attributes: ['IDDH', 'DIACHINHAN', 'TEN', 'SDT', 'EMAIL', 'PT_THANHTOAN', 'createdAt', 'TRANGTHAI']
            })


            return res.json({ donhang })
        } catch (error) {
            console.log(error);
        }


    }

    changeTT = async (req, res) => {
        if (!req.body.trangthai) {
            return res.json({
                message: 'missing data'
            })
        }

        try {
            let result = await db.DONHANG.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })
            result.TRANGTHAI = req.body.trangthai
            await result.save()
            return res.json({
                message: 'success'
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