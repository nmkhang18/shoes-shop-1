'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DANHMUCSANPHAM extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DANHMUCSANPHAM.hasMany(models.CT_DANHMUC, { foreignKey: 'IDDM' })
            DANHMUCSANPHAM.hasMany(models.CT_MAUSAC, { foreignKey: 'IDSP' })


        }
    }
    DANHMUCSANPHAM.init({
        IDDM: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        TENDANHMUC: DataTypes.STRING(50),
        MOTA: DataTypes.TEXT,
        TRANGTHAI: DataTypes.BOOLEAN,


    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'DANHMUCSANPHAM',
    });

    return DANHMUCSANPHAM;
};