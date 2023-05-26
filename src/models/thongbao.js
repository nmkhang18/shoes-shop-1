'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class THONGBAO extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

        }
    }
    THONGBAO.init({
        IDTB: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        NOIDUNG: DataTypes.TEXT('long'),
        TIEUDE: DataTypes.STRING,
        TRANGTHAI: DataTypes.TINYINT


    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'THONGBAO',
    });

    return THONGBAO;
};