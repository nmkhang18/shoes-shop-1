'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class DONHANG extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            DONHANG.hasMany(models.CT_DONHANG, { foreignKey: 'IDDH' })
            DONHANG.belongsTo(models.TAIKHOAN, { foreignKey: 'ID' })

        }
    }
    DONHANG.init({
        IDDH: {
            type: DataTypes.CHAR(15),
            primaryKey: true,
        },
        DIACHINHAN: DataTypes.STRING(50),
        TEN: DataTypes.STRING(50),
        SDT: DataTypes.CHAR(10),
        EMAIL: DataTypes.STRING(50),
        PT_THANHTOAN: DataTypes.STRING(50),
        TRANGTHAI: DataTypes.STRING(50),
        ID: DataTypes.CHAR(15)


    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'DONHANG',
    });

    return DONHANG;
};