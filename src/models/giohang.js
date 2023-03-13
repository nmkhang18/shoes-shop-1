'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GIOHANG extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            GIOHANG.hasMany(models.CT_GIOHANG, { foreignKey: 'IDGH' })
            GIOHANG.belongsTo(models.TAIKHOAN, { foreignKey: 'ID' })


        }
    }
    GIOHANG.init({
        IDGH: {
            type: DataTypes.CHAR(15),
            primaryKey: true,
        },
        ID: DataTypes.CHAR(15)

    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'GIOHANG',
    });

    return GIOHANG;
};