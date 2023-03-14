'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class TAIKHOAN extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            TAIKHOAN.hasMany(models.DONHANG, { foreignKey: 'ID' })
            TAIKHOAN.hasMany(models.GIOHANG, { foreignKey: 'ID' })


        }
    }
    TAIKHOAN.init({
        ID: {
            type: DataTypes.CHAR(15),
            primaryKey: true,
        },
        TENNGUOIDUNG: DataTypes.STRING(50),
        GIOITINH: DataTypes.CHAR(3),
        NGAYSINH: DataTypes.DATEONLY,
        DIACHI: DataTypes.STRING(50),
        SDT: DataTypes.CHAR(10),
        EMAIL: DataTypes.STRING(50),
        PASSWORD: DataTypes.STRING(100),

    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'TAIKHOAN',
    });

    return TAIKHOAN;
};