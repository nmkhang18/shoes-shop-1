'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CT_GIOHANG extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CT_GIOHANG.belongsTo(models.CT_KICHTHUOC, { foreignKey: 'IDSP' })
            CT_GIOHANG.belongsTo(models.CT_KICHTHUOC, { foreignKey: 'IDMS' })
            CT_GIOHANG.belongsTo(models.CT_KICHTHUOC, { foreignKey: 'IDKT' })
            CT_GIOHANG.belongsTo(models.CT_MAUSAC, { foreignKey: 'IDSP' })
            CT_GIOHANG.belongsTo(models.CT_MAUSAC, { foreignKey: 'IDMS' })
            CT_GIOHANG.belongsTo(models.SANPHAM, { foreignKey: 'IDSP' })
            CT_GIOHANG.belongsTo(models.KICHTHUOC, { foreignKey: 'IDKT' })
            CT_GIOHANG.belongsTo(models.MAUSAC, { foreignKey: 'IDMS' })
            CT_GIOHANG.belongsTo(models.GIOHANG, { foreignKey: 'IDGH' })

        }
    }
    CT_GIOHANG.init({
        IDGH: {
            type: DataTypes.CHAR(15),
            primaryKey: true,
        },
        IDSP: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        IDMS: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        IDKT: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        SOLUONG: DataTypes.INTEGER


    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'CT_GIOHANG',
    });

    return CT_GIOHANG;
};