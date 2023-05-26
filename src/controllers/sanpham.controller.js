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
        if (req.query.danhmuc) {
            try {
                console.log(req.query.danhmuc);
                let result = await db.CT_DANHMUC.findAll({
                    include: {
                        model: db.SANPHAM,
                        attributes: ["IDSP", "TENSANPHAM", "MOTA", "GIA", "TRANGTHAI"],
                        include: [{
                            model: db.NHANHIEU,
                            attributes: ["TENNHANHIEU"],
                            required: true
                        },
                        {
                            model: db.CT_MAUSAC,
                            required: true
                        }],

                        attributes: ["IDSP", "TENSANPHAM", "MOTA", "GIA", "TRANGTHAI"],

                    },
                    where: {
                        IDDM: req.query.danhmuc
                    }

                })

                let result1 = await db.SANPHAM.findAll({
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

                result = result.map(result => {
                    return result.dataValues.SANPHAM
                })

                for (let i = 0; i < result1.length; i++) {
                    for (let j = 0; j < result.length; j++) {
                        if (result1[i].dataValues.IDSP == result[j].dataValues.IDSP) {
                            result1.splice(i, 1)
                        }
                    }
                }

                let countSL = await db.CT_KICHTHUOC.findAll({
                    attributes: [
                        'IDSP',
                        [sequelize.fn('sum', sequelize.col('SOLUONGDABAN')), 'DABAN'],
                    ],
                    group: ['IDSP'],
                })


                // return res.json(result)

                // console.log(countS   L[0]);
                result = result.map(result => {
                    const sumSL = countSL.find(SL => SL.dataValues.IDSP == result.dataValues.IDSP)
                    result.dataValues.DABAN = sumSL ? sumSL.dataValues.DABAN : 0
                    // result.dataValues.NHANHIEU = result.dataValues.NHANHIEU.dataValues.TENNHANHIEU
                    result.dataValues.HINH = result.dataValues.CT_MAUSACs[0].dataValues.HINHANH
                    result.dataValues.NHANHIEU = result.dataValues.NHANHIEU.dataValues.TENNHANHIEU
                    delete result.dataValues.CT_MAUSACs
                    return result
                })

                let countSL1 = await db.CT_KICHTHUOC.findAll({
                    attributes: [
                        'IDSP',
                        [sequelize.fn('sum', sequelize.col('SOLUONGDABAN')), 'DABAN'],
                    ],
                    group: ['IDSP'],
                })


                // console.log(countSL[0]);

                result1 = result1.map(result => {
                    const sumSL = countSL1.find(SL => SL.dataValues.IDSP == result.dataValues.IDSP)
                    result.dataValues.DABAN = sumSL ? sumSL.dataValues.DABAN : 0
                    // result.dataValues.NHANHIEU = result.dataValues.NHANHIEU.dataValues.TENNHANHIEU
                    result.dataValues.HINH = result.dataValues.CT_MAUSACs[0].dataValues.HINHANH
                    result.dataValues.NHANHIEU = result.dataValues.NHANHIEU.dataValues.TENNHANHIEU
                    delete result.dataValues.CT_MAUSACs
                    return result
                })


                return res.json({
                    result,
                    others: result1
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
                },
                order: [['IDSP', 'DESC']],
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

            let records = await sequelize.query(`SELECT SP."IDSP", SP."TENSANPHAM", SP."GIA", SP,"MOTA"
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
        let { tensanpham, mota, gia } = req.body
        if (!tensanpham || !mota || !gia) {
            return res.json({
                message: 'missing data'
            })
        }
        try {
            let result = await db.SANPHAM.findByPk(req.params.id)
            if (!result) return res.json({
                message: 'Not found'
            })

            result.TENSANPHAM = tensanpham
            result.MOTA = mota
            result.GIA = gia

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
    editMS = async (req, res) => {
        let { them } = req.body
        if (!them) {
            return res.json({
                message: 'missing data'
            })
        }
        let ctkt = JSON.parse(req.body.CTKT)
        ctkt = ctkt.map(result => {
            result.IDSP = req.params.id
            result.IDMS = req.params.ms
            return result
        })

        console.log(ctkt);

        try {
            let result = await db.CT_MAUSAC.findOne({
                where: {
                    IDSP: req.params.id,
                    IDMS: req.params.ms
                }
            })
            if (!result) return res.json({
                message: 'Not found'
            })
            console.log(result);

            if (req.files) {
                let idDrive = await upload(res, req.files.file.data, req.params.ms)
                // console.log(id);
                const hinh = `https://drive.google.com/uc?export=view&id=${idDrive}`
                result.HINHANH = hinh
            }
            result.THEM = req.body.them
            await db.CT_KICHTHUOC.bulkUpdate(ctkt, { keys: ["IDSP", "IDMS", "IDKT"], fields: ["SOLUONGTON"] })

            await result.save()

            return res.json({
                message: 'Update successfull'
            })
        }
        catch (error) {
            console.log(error.message);
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }

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

    checkSL = async (req, res) => {

    }
}

module.exports = new controller