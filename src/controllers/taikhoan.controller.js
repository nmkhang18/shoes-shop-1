// const { pool } = require('../configs/connectDB')
const db = require('../models/index')
const Sequelize = require('sequelize')
const { sequelize } = require('../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { loginValitdation, registValitdation, editUserValitdation, editPasswordValitdation, forgotPasswordValitdation } = require('../validations/validate')
const { createId } = require('../helpers/helpers')
const OtpGenerator = require('otp-generator')
const { insertOtp } = require('../services/otp.service')
const { date } = require('joi')

class controller {

    dangnhap = async (req, res) => {
        const { email, password } = req.body
        const { error } = loginValitdation(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })
        try {
            let result = await db.TAIKHOAN.findOne({
                where: {
                    EMAIL: email
                }
            })
            if (!result) return res.json({
                message: 'Email does not exist'
            })
            if (result.TRANGTHAI == 'false') return res.json({
                message: 'Account banned'
            })
            if (!bcrypt.compareSync(password, result.PASSWORD)) return res.json({
                message: 'Incorrect password'
            })
            const token = jwt.sign({ _id: result.ID, exp: Math.floor(Date.now() / 1000 + (60 * parseInt(process.env.TOKEN_TIME))) }, process.env.TOKEN_SECRET)
            return res.json({
                message: 'Logged in',
                data: {
                    accessToken: token
                }
            })

        } catch (error) {
            console.log(error);
        }
    }
    sendOTP = async (req, res) => {
        const { email } = req.body
        if (!email) {
            return res.json({
                message: 'missing data'
            })
        }
        try {
            const checkMail = await db.TAIKHOAN.findOne({
                where: {
                    EMAIL: email
                }
            })
            if (checkMail) return res.json({
                message: 'Email existed'
            })
            const otp = await OtpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            })
            let success = await insertOtp({ email, otp })
            return res.json({
                success: success,
                otp: otp
            })
        } catch (error) {
            console.log(error);
        }

    }
    dangky = async (req, res) => {
        const { tennguoidung, gioitinh, ngaysinh, diachi, sdt, email, password, repeat_password, otp } = req.body
        const { error } = registValitdation(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })
        const now = new Date()
        try {
            const checkOTP = await db.OTP.findByPk(email)
            if (!checkOTP) return res.json({
                message: ''
            })
            if (!bcrypt.compareSync(otp, checkOTP.VALUE)) return res.json({
                message: 'Incorrect otp'
            })
            const expireTime = new Date(checkOTP.THOIHAN)
            console.log(expireTime.getTime());
            if (now.getTime() > expireTime.getTime()) return res.json({
                message: 'OTP expired'
            })


            const salt = await bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const result = await sequelize.transaction(async t => {
                let taikhoan = await db.TAIKHOAN.create({
                    ID: createId(),
                    TENNGUOIDUNG: tennguoidung,
                    GIOITINH: gioitinh,
                    NGAYSINH: ngaysinh,
                    DIACHI: diachi,
                    SDT: sdt,
                    EMAIL: email,
                    PASSWORD: hashPassword
                }, { transaction: t })

                let giohang = await db.GIOHANG.create({
                    IDGH: createId(),
                    ID: taikhoan.ID
                }, { transaction: t })
                await checkOTP.destroy()

                return { taikhoan, giohang }

            })
            return res.json({
                message: 'Create successfull'
            })

        } catch (error) {

        }
    }

    editInfo = async (req, res) => {
        const { tennguoidung, gioitinh, ngaysinh, diachi, sdt } = req.body
        const { error } = editUserValitdation(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })
        try {
            let result = await db.TAIKHOAN.findByPk(req.user._id)
            if (!result) return res.json({
                message: 'Not found'
            })
            result.TENNGUOIDUNG = tennguoidung
            result.GIOITINH = gioitinh
            result.NGAYSINH = ngaysinh
            result.SDT = sdt
            result.DIACHI = diachi
            await result.save()
            return res.json({
                message: 'Update successfull'
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }
    }
    editPassword = async (req, res) => {
        const { password, new_password, repeat_password } = req.body
        const { error } = editPasswordValitdation(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })
        try {
            let result = await db.TAIKHOAN.findByPk(req.user._id)
            if (!result) return res.json({
                message: 'Not found'
            })
            if (!bcrypt.compareSync(password, result.PASSWORD)) return res.json({
                message: 'Incorrect password'
            })
            const salt = await bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(new_password, salt)
            result.PASSWORD = hashPassword
            await result.save()
            return res.json({
                message: 'Update successfull'
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }
    }
    forgotPWOTP = async (req, res) => {
        const { email } = req.body
        if (!email) {
            return res.json({
                message: 'missing data'
            })
        }
        try {
            const checkMail = await db.TAIKHOAN.findOne({
                where: {
                    EMAIL: email
                }
            })
            if (!checkMail) return res.json({
                message: 'account does not exist'
            })
            const otp = await OtpGenerator.generate(6, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            })
            let success = await insertOtp({ email, otp })
            return res.json({
                success: success,
                otp: otp
            })
        } catch (error) {
            console.log(error);
        }
    }
    changePWviaOTP = async (req, res) => {
        const { email, new_password, repeat_password, otp } = req.body
        const { error } = forgotPasswordValitdation(req.body)
        if (error) return res.json({
            message: error.details[0].message
        })
        try {
            const checkOTP = await db.OTP.findByPk(email)
            if (!checkOTP) return res.json({
                message: ''
            })
            if (!bcrypt.compareSync(otp, checkOTP.VALUE)) return res.json({
                message: 'Incorrect otp'
            })
            const now = new Date()
            const expireTime = new Date(checkOTP.THOIHAN)
            console.log(expireTime.getTime());
            if (now.getTime() > expireTime.getTime()) return res.json({
                message: 'OTP expired'
            })

            let result = await db.TAIKHOAN.findOne({
                where: {
                    EMAIL: email
                }
            })
            if (!result) return res.json({
                message: 'Not found'
            })
            const salt = await bcrypt.genSaltSync(10)
            const hashPassword = await bcrypt.hash(new_password, salt)
            result.PASSWORD = hashPassword
            await result.save()
            await checkOTP.destroy()
            return res.json({
                message: 'Update successfull'
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: 'Unsuccess',
            });
        }
    }
}
module.exports = new controller