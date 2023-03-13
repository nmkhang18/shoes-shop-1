'use strict';
const {
    Model
} = require('sequelize');
const mausac = require('./mausac');
module.exports = (sequelize, DataTypes) => {
    class CT_MAUSAC extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CT_MAUSAC.belongsTo(models.MAUSAC, { foreignKey: 'IDMS' })
            CT_MAUSAC.belongsTo(models.SANPHAM, { foreignKey: 'IDSP' })
            CT_MAUSAC.hasMany(models.CT_KICHTHUOC, { foreignKey: 'IDSP' })
            CT_MAUSAC.hasMany(models.CT_KICHTHUOC, { foreignKey: 'IDMS' })


        }
    }
    CT_MAUSAC.init({
        IDSP: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        IDMS: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        THEM: DataTypes.DECIMAL(15, 4),
        HINHANH: DataTypes.STRING,
        TRANGTHAI: DataTypes.BOOLEAN,


    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'CT_MAUSAC',
    });

    return CT_MAUSAC;
};