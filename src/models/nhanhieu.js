'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class NHANHIEU extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            NHANHIEU.hasMany(models.SANPHAM, { foreignKey: 'IDNH' })
        }
    }
    NHANHIEU.init({
        IDNH: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        TENNHANHIEU: DataTypes.STRING,
        MOTA: DataTypes.TEXT('long'),
        HINH: DataTypes.STRING,
        TRANGTHAI: DataTypes.TINYINT,


    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'NHANHIEU',
    });

    return NHANHIEU;
};