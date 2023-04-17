const db = require('../models/index')
const Sequelize = require('sequelize')
const { dangnhap } = require('../middlewares/auth.middlewares')
const Op = Sequelize.Op



class controller {
    createDH = async (req, res) => {

    }
    getAll = async (req, res) => {

        try {

            let donhang = await db.DONHANG.findOne({
                where: {
                    ID: req.user._id
                }
            })

            res.json({ donhang })
        } catch (error) {
            console.log(error);
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