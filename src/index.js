const express = require('express')
const fileUpload = require('express-fileupload')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const connectDB = require('./configs/connectDB')
const jwt = require('jsonwebtoken')
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
app.use(fileUpload())
app.use(helmet())
app.use(morgan('common'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//==========================================================

//routes
//==========================================================
const danhmucRouter = require('./routes/danhmuc.route')
const nhanhieuRouter = require('./routes/nhanhieu.route')
const sanphamRouter = require('./routes/sanpham.route')
const donhangRouter = require('./routes/donhang.route')
const thongbaoRouter = require('./routes/thongbao.route')
const bannerRouter = require('./routes/banner.route')
const nguoidungRouter = require('./routes/nguoidung.route')
const taikhoanRouter = require('./routes/taikhoan.route')
const giohangRouter = require('./routes/giohang.route')

const db = require('./models')
//==========================================================
app.use('/danhmuc', danhmucRouter)
app.use('/nhanhieu', nhanhieuRouter)
app.use('/sanpham', sanphamRouter)
app.use('/donhang', donhangRouter)
app.use('/giohang', giohangRouter)
app.use('/taikhoan', taikhoanRouter)

// app.use('/thongbao', thongbaoRouter)
// app.use('/banner', bannerRouter)
// app.use('/nguoidung', nguoidungRouter)
//==========================================================
app.post('/admin/dangnhap', async (req, res) => {
    const { loginname, password } = req.body
    if (!loginname || !password) return res.json({
        message: 'Missing data'
    })
    if (loginname != process.env.ADMIN || password != process.env.ADMINPASSWORD) return res.json({
        message: 'Wrong infomation'
    })
    const token = jwt.sign({ role: 'admin', exp: Math.floor(Date.now() / 1000 + (60 * parseInt(process.env.TOKEN_TIME))) }, process.env.TOKEN_SECRET)
    return res.json({
        message: 'Logged in',
        data: {
            accessToken: token
        }
    })

})
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})