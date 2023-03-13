// // get the client
// const mysql = require('mysql2/promise')

// console.log("Creating connection pool...");

// module.exports.pool = mysql.createPool({
//     host: 'sql12.freemysqlhosting.net',
//     user: 'sql12601355',
//     password: '46equVaDNW',
//     database: 'sql12601355',
//     // password: 'password'
// })


const { sequelize } = require('../models')

const connectDb = async () => {
    try {
        await sequelize.authenticate()
        console.log('Authenticating')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDb