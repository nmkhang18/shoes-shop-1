const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const connectDB = require('./configs/connectDB')
require('dotenv').config()
//app & port
//==========================================================
const app = express()
const port = process.env.PORT || 5000
//==========================================================

//config
//==========================================================
app.use(cors({
    origin: '*',
}));
app.use(helmet())
app.use(morgan('common'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//==========================================================

//routes
//==========================================================
const authRouter = require('./routes/auth.route')
const danhmucRouter = require('./routes/danhmuc.route')
const nhanhieuRouter = require('./routes/nhanhieu.route')
const sanphamRouter = require('./routes/sanpham.route')
const donhangRouter = require('./routes/donhang.route')
const thongbaoRouter = require('./routes/thongbao.route')
const bannerRouter = require('./routes/banner.route')
const nguoidungRouter = require('./routes/nguoidung.route')
//==========================================================
app.use('/danhmuc', danhmucRouter)
app.use('/nhanhieu', nhanhieuRouter)
app.use('/sanpham', sanphamRouter)
app.use('/donhang', donhangRouter)
// app.use('/thongbao', thongbaoRouter)
// app.use('/banner', bannerRouter)
// app.use('/nguoidung', nguoidungRouter)
//==========================================================

app.get('/', async (req, res) => {
    const db = require('./models/index')
    const sequelize = require('sequelize')
    let result = await db.SANPHAM.findAll({
        include: {
            model: db.CT_MAUSAC,
            include: {
                model: db.MAUSAC,
                attributes: ['MAU'],
                required: true
            },
            required: true

        },
        attributes: ['IDSP', 'TENSANPHAM'],
    })

    return res.json({
        result
    })

})

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})