// const { pool } = require('../configs/connectDB')
const db = require('../models/index')
const Sequelize = require('sequelize')
const { sequelize } = require('../models/index')
const { upload, delete1 } = require('../configs/uploadDrive')
const { reset } = require('nodemon')


class controller {
    getAll = async (req, res) => {
        if (req.query.nhanhieu) {
            try {
                let result = await db.SANPHAM.findAll({
                    include: [{
                        model: db.NHANHIEU,
                        attributes: ["TENNHANHIEU"],
                        require: true
                    },
                    {
                        model: db.CT_MAUSAC,
                        require: true
                    }],

                    attributes: ["IDSP", "TENSANPHAM", "MOTA", "GIA", "TRANGTHAI"],

                    where: {
                        TRANGTHAI: true,
                        IDNH: req.query.nhanhieu,
                    }
                })
                let countSL = await db.CT_KICHTHUOC.findAll({
                    attributes: [
                        'IDSP',
                        [sequelize.fn('sum', sequelize.col('SOLUONGDABAN')), 'DABAN'],
                    ],
                    group: ['IDSP'],
                })


                // console.log(countSL[0]);

                result = result.map(result => {
                    const sumSL = countSL.find(SL => SL.dataValues.IDSP == result.dataValues.IDSP)
                    result.dataValues.DABAN = sumSL ? sumSL.dataValues.DABAN : 0
                    // result.dataValues.NHANHIEU = result.dataValues.NHANHIEU.dataValues.TENNHANHIEU
                    result.dataValues.HINH = result.dataValues.CT_MAUSACs[0].dataValues.HINHANH
                    result.dataValues.NHANHIEU = result.dataValues.NHANHIEU.dataValues.TENNHANHIEU
                    delete result.dataValues.CT_MAUSACs
                    return result
                })



                return res.json({
                    result
                })
            } catch (error) {
                console.log(error);
            }
        }

        try {
            let result = await db.SANPHAM.findAll({
                include: [{
                    model: db.NHANHIEU,
                    attributes: ["TENNHANHIEU"],
                    require: true
                },
                {
                    model: db.CT_MAUSAC,
                    require: true
                }],

                attributes: ["IDSP", "TENSANPHAM", "MOTA", "GIA", "TRANGTHAI"],

                where: {
                    TRANGTHAI: true,
                }
            })
            let countSL = await db.CT_KICHTHUOC.findAll({
                attributes: [
                    'IDSP',
                    [sequelize.fn('sum', sequelize.col('SOLUONGDABAN')), 'DABAN'],
                ],
                group: ['IDSP'],
            })


            // console.log(countSL[0]);

            result = result.map(result => {
                const sumSL = countSL.find(SL => SL.dataValues.IDSP == result.dataValues.IDSP)
                result.dataValues.DABAN = sumSL ? sumSL.dataValues.DABAN : 0
                // result.dataValues.NHANHIEU = result.dataValues.NHANHIEU.dataValues.TENNHANHIEU
                result.dataValues.HINH = result.dataValues.CT_MAUSACs[0].dataValues.HINHANH
                result.dataValues.NHANHIEU = result.dataValues.NHANHIEU.dataValues.TENNHANHIEU
                delete result.dataValues.CT_MAUSACs
                return result
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

            let records = await sequelize.query(`SELECT SP."IDSP", SP."TENSANPHAM", SP."GIA"
                                                    FROM PUBLIC."SANPHAM" SP
                                                    WHERE SP."IDSP" = ${req.params.id}`, {
                nest: true,
                type: Sequelize.QueryTypes.SELECT
            });

            let records1 = await sequelize.query(`SELECT SP."IDMS", MS."MAMAU", MS."MAU", SP."THEM", SP."HINHANH", SP."TRANGTHAI"
                                                    FROM PUBLIC."CT_MAUSAC" SP, PUBLIC."MAUSAC" MS
                                                    WHERE SP."IDMS" = MS."IDMS" AND SP."IDSP" = ${req.params.id}`, {
                nest: true,
                type: Sequelize.QueryTypes.SELECT
            });
            let records2 = await sequelize.query(`SELECT SP."IDKT", KT."SIZE", SP."SOLUONGTON", SP."SOLUONGDABAN", SP."IDMS", SP."TRANGTHAI"
                                                    FROM PUBLIC."CT_KICHTHUOC" SP, PUBLIC."KICHTHUOC" KT
                                                    WHERE SP."IDKT" = KT."IDKT"  AND SP."IDSP" = ${req.params.id}`, {
                nest: true,
                type: Sequelize.QueryTypes.SELECT
            });

            console.log(records2);

            records1 = records1.map(result => {
                let temp = []

                for (let i = 0; i < records2.length; i++) {
                    if (records2[i].IDMS == result.IDMS) {
                        delete records2[i].IDMS
                        temp.push(records2[i])
                    }
                }
                result.CT_KICHTHUOCs = temp
                return result
            })

            records = records.map(result => {
                result.CT_MAUSACs = records1
                return result
            })

            console.log(records);

            return res.json({
                result: records[0]
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



        console.log(req.body);


        let listHinh = []
        let CTKT = []
        for (let i = 0; i < req.files.file.length; i++) {
            console.log();
            listHinh.push(await upload(res, req.files.file[i].data, `${req.body.TENSANPHAM}${i}`))
        }


        let SP = {
            TENSANPHAM: req.body.TENSANPHAM,
            GIA: req.body.GIA,
            IDNH: req.body.NHANHIEU,
            MOTA: req.body.MOTA
        }
        console.log(req.body.CTMS);
        let CTMS = JSON.parse(req.body.CTMS)
        for (let i = 0; i < CTMS.length; i++) {
            CTMS[i].HINHANH = 'https://drive.google.com/uc?export=view&id=' + listHinh[i]
            for (let j = 0; j < CTMS[i].CTKT.length; j++) {
                CTMS[i].CTKT[j].IDMS = CTMS[i].IDMS
                CTKT.push(CTMS[i].CTKT[j])
            }
            delete CTMS[i].CTKT
        }
        console.log(SP);
        console.log(CTMS);
        console.log(CTKT);

        try {
            const result = await sequelize.transaction(async t => {
                let sanpham = await db.SANPHAM.create(SP, { transaction: t })
                console.log(sanpham);
                CTMS = CTMS.map(item => {
                    item.IDSP = sanpham.IDSP
                    return item
                })
                CTKT = CTKT.map(item => {
                    item.IDSP = sanpham.IDSP
                    return item
                })
                let mau = await db.CT_MAUSAC.bulkCreate(CTMS, { transaction: t })
                let size = await db.CT_KICHTHUOC.bulkCreate(CTKT, { transaction: t })
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