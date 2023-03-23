'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class KICHTHUOC extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            KICHTHUOC.hasMany(models.CT_KICHTHUOC, { foreignKey: 'IDKT' })
            KICHTHUOC.hasMany(models.CT_GIOHANG, { foreignKey: 'IDKT' })
            KICHTHUOC.hasMany(models.CT_DONHANG, { foreignKey: 'IDKT' })


        }
    }
    KICHTHUOC.init({
        IDKT: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        SIZE: DataTypes.INTEGER

    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'KICHTHUOC',
    });

    return KICHTHUOC;
};