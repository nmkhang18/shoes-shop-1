const db = require('../models/index')
const Sequelize = require('sequelize')
const { dangnhap } = require('../middlewares/auth.middlewares')
const Op = Sequelize.Op
const { createId } = require('../helpers/helpers')
const { sequelize } = require('../models/index')

class controller {
    getAll = async (req, res) => {
        let result = await sequelize.query(`SELECT CTDH."IDSP", CTDH."IDMS", CTSP."TENSANPHAM", CTSP."MAU", (CTDH."sl" * CTSP."tonggia") as doanhthu FROM (SELECT "IDSP", "IDMS", COUNT("IDSP") AS SL FROM PUBLIC."CT_DONHANG" WHERE EXTRACT(MONTH FROM "createdAt") = ${req.params.month} GROUP BY "IDSP", "IDMS") AS CTDH, (SELECT SP."IDSP", SP."TENSANPHAM", CTMS."MAU", CTMS."IDMS",(SP."GIA" + CTMS."THEM") AS TONGGIA FROM PUBLIC."SANPHAM" SP, (SELECT CT."IDSP", CT."IDMS", CT."THEM", MS."MAU" FROM PUBLIC."CT_MAUSAC" CT INNER JOIN PUBLIC."MAUSAC" MS ON CT."IDMS" = MS."IDMS") AS CTMS WHERE SP."IDSP" = CTMS."IDSP") AS CTSP WHERE CTDH."IDSP" = CTSP."IDSP" AND CTDH."IDMS" = CTSP."IDMS"`, {
            nest: true,
            type: Sequelize.QueryTypes.SELECT
        });
        return res.json(result)
    }
}

module.exports = new controller