const db = require('../models/index')
const Sequelize = require('sequelize')
const { dangnhap } = require('../middlewares/auth.middlewares')
const Op = Sequelize.Op
const { createId } = require('../helpers/helpers')
const { sequelize } = require('../models/index')

class controller {
    getByMonth = async (req, res) => {

        let result = await sequelize.query(`SELECT	CTDH."IDSP", CTSP."TENSANPHAM", sum((CTDH."sl" * CTSP."tonggia")) as doanhthu, sum(CTDH."sl")
        FROM 	(SELECT "IDSP", "IDMS", COUNT("IDSP") AS SL
                FROM PUBLIC."CT_DONHANG"
                WHERE EXTRACT(MONTH FROM "createdAt") = ${req.params.month} AND EXTRACT(YEAR FROM "createdAt") = ${req.params.year}
                GROUP BY "IDSP", "IDMS") AS CTDH,
                (SELECT SP."IDSP", SP."TENSANPHAM", CTMS."MAU", CTMS."IDMS",(SP."GIA" + CTMS."THEM") AS TONGGIA
                FROM PUBLIC."SANPHAM" SP, 
                (SELECT CT."IDSP", CT."IDMS", CT."THEM", MS."MAU"
                 FROM PUBLIC."CT_MAUSAC" CT 
                 INNER JOIN PUBLIC."MAUSAC" MS 
                 ON CT."IDMS" = MS."IDMS") AS CTMS
                WHERE SP."IDSP" = CTMS."IDSP") AS CTSP
        WHERE CTDH."IDSP" = CTSP."IDSP" AND CTDH."IDMS" = CTSP."IDMS"
        group by CTDH."IDSP", CTSP."TENSANPHAM"`, {
            nest: true,
            type: Sequelize.QueryTypes.SELECT
        });

        let result1 = await sequelize.query(`SELECT CTDH."IDSP", CTDH."IDMS", CTSP."MAU", (CTDH."sl" * CTSP."tonggia") as doanhthu, CTDH."sl" FROM (SELECT "IDSP", "IDMS", COUNT("IDSP") AS SL FROM PUBLIC."CT_DONHANG" WHERE EXTRACT(MONTH FROM "createdAt") = ${req.params.month} AND EXTRACT(YEAR FROM "createdAt") = ${req.params.year} GROUP BY "IDSP", "IDMS") AS CTDH, (SELECT SP."IDSP", SP."TENSANPHAM", CTMS."MAU", CTMS."IDMS",(SP."GIA" + CTMS."THEM") AS TONGGIA FROM PUBLIC."SANPHAM" SP, (SELECT CT."IDSP", CT."IDMS", CT."THEM", MS."MAU" FROM PUBLIC."CT_MAUSAC" CT INNER JOIN PUBLIC."MAUSAC" MS ON CT."IDMS" = MS."IDMS") AS CTMS WHERE SP."IDSP" = CTMS."IDSP") AS CTSP WHERE CTDH."IDSP" = CTSP."IDSP" AND CTDH."IDMS" = CTSP."IDMS"`, {
            nest: true,
            type: Sequelize.QueryTypes.SELECT
        });


        console.log(result);
        console.log(result1);


        result = result.map(result => {
            let temp = []
            for (let i = 0; i < result1.length; i++) {
                if (result.IDSP == result1[i].IDSP) {
                    temp.push(result1[i])
                }
            }
            result.CT = temp
            return result
        })


        return res.json(result)
    }
}

module.exports = new controller