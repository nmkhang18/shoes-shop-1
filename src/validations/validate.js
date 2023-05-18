const Joi = require('joi')

module.exports.registValitdation = (data) => {

    const schema = Joi.object({
        tennguoidung: Joi.string().min(6).required(),
        ngaysinh: Joi.date().iso().required(),
        gioitinh: Joi.string().min(2).required(),
        diachi: Joi.string().min(6).required(),
        sdt: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: Joi.string().min(15).email().required(),
        password: Joi.string().min(3).required(),
        repeat_password: Joi.ref('password'),
        otp: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
    })

    return schema.validate(data)
}

module.exports.loginValitdation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(15).email().required(),
        password: Joi.string().min(3).required(),
    })

    return schema.validate(data)
}

module.exports.editUserValitdation = (data) => {

    const schema = Joi.object({
        tennguoidung: Joi.string().min(6).required(),
        ngaysinh: Joi.date().iso().required(),
        gioitinh: Joi.string().min(2).required(),
        // diachi: Joi.string().min(6).required(),
        sdt: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    })

    return schema.validate(data)
}
module.exports.editPasswordValitdation = (data) => {

    const schema = Joi.object({
        password: Joi.string().min(3).required(),
        new_password: Joi.string().min(3).required(),
        repeat_password: Joi.ref('new_password')
    })

    return schema.validate(data)
}

module.exports.forgotPasswordValitdation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(15).email().required(),
        new_password: Joi.string().min(3).required(),
        repeat_password: Joi.ref('new_password'),
        otp: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
    })

    return schema.validate(data)
}