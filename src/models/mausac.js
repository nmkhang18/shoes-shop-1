'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MAUSAC extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            MAUSAC.hasMany(models.CT_MAUSAC, { foreignKey: 'IDMS' })
            MAUSAC.hasMany(models.CT_KICHTHUOC, { foreignKey: 'IDMS' })
            MAUSAC.hasMany(models.CT_GIOHANG, { foreignKey: 'IDMS' })
            MAUSAC.hasMany(models.CT_DONHANG, { foreignKey: 'IDMS' })


        }
    }
    MAUSAC.init({
        IDMS: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        MAU: DataTypes.STRING

    }, {
        sequelize,
        freezeTableName: true,
        modelName: 'MAUSAC',
    });

    return MAUSAC;
};