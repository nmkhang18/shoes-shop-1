'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BANNER extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {


        }
    }
    BANNER.init({
        ID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        HINHANH: DataTypes.STRING,
        TRANGTHAI: DataTypes.BOOLEAN,

    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'BANNER',
    });

    return BANNER;
};