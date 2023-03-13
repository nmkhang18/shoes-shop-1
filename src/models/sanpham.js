'use strict';
const {
    Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
    class SANPHAM extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            SANPHAM.belongsTo(models.NHANHIEU, { foreignKey: 'IDNH' })
            SANPHAM.hasMany(models.CT_MAUSAC, { foreignKey: 'IDSP' })
            SANPHAM.hasMany(models.CT_DANHMUC, { foreignKey: 'IDSP' })



        }
    }
    SANPHAM.init({
        IDSP: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        TENSANPHAM: DataTypes.STRING,
        IDNH: DataTypes.INTEGER,
        MOTA: DataTypes.TEXT,
        GIA: DataTypes.DECIMAL(15, 4),
        TRANGTHAI: {
            type: DataTypes.BOOLEAN,
            defaultValue: 'true'
        }

    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'SANPHAM',
    });

    return SANPHAM;
};