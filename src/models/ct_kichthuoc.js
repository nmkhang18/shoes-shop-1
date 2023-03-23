'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CT_KICHTHUOC extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CT_KICHTHUOC.belongsTo(models.CT_MAUSAC, { foreignKey: 'IDSP' })
            CT_KICHTHUOC.belongsTo(models.SANPHAM, { foreignKey: 'IDSP' })
            CT_KICHTHUOC.belongsTo(models.CT_MAUSAC, { foreignKey: 'IDMS' })
            CT_KICHTHUOC.belongsTo(models.KICHTHUOC, { foreignKey: 'IDKT' })
            CT_KICHTHUOC.belongsTo(models.MAUSAC, { foreignKey: 'IDMS' })


            CT_KICHTHUOC.hasMany(models.CT_DONHANG, { foreignKey: 'IDSP' })
            CT_KICHTHUOC.hasMany(models.CT_DONHANG, { foreignKey: 'IDMS' })
            CT_KICHTHUOC.hasMany(models.CT_DONHANG, { foreignKey: 'IDKT' })

            CT_KICHTHUOC.hasMany(models.CT_GIOHANG, { foreignKey: 'IDSP' })
            CT_KICHTHUOC.hasMany(models.CT_GIOHANG, { foreignKey: 'IDMS' })
            CT_KICHTHUOC.hasMany(models.CT_GIOHANG, { foreignKey: 'IDKT' })



        }
    }
    CT_KICHTHUOC.init({
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
        SOLUONGTON: DataTypes.INTEGER,
        SOLUONGDABAN: DataTypes.INTEGER,
        TRANGTHAI: DataTypes.BOOLEAN,


    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'CT_KICHTHUOC',
    });

    return CT_KICHTHUOC;
};