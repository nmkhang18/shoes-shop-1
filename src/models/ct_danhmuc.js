'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class CT_DANHMUC extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CT_DANHMUC.belongsTo(models.SANPHAM, { foreignKey: 'IDSP' })
            CT_DANHMUC.belongsTo(models.DANHMUCSANPHAM, { foreignKey: 'IDDM' })


        }
    }
    CT_DANHMUC.init({
        IDDM: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        IDSP: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },


    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'CT_DANHMUC',
    });

    return CT_DANHMUC;
};