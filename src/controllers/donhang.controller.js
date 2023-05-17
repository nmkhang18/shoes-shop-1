const db = require('../models/index')
const Sequelize = require('sequelize')
const { dangnhap } = require('../middlewares/auth.middlewares')
const Op = Sequelize.Op
const { createId } = require('../helpers/helpers')
const { sequelize } = require('../models/index')




class controller {

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
                    ID: req.user._id
                }, { transaction: t })

                CTSP = CTSP.map(item => {
                    item.IDDH = donhang.IDDH
                    return item
                })

                let ct = await db.CT_DONHANG.bulkCreate(CTSP, { transaction: t })
                return { donhang, ct }

            })
            return res.json(result)
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = new controller