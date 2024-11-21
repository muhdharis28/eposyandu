const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class PenghapusanData extends Model {}

PenghapusanData.init({
    pengguna: {
        type: DataTypes.INTEGER,
    },
    nama: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('diminta', 'dibatalkan'),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'PenghapusanData'
});

module.exports = PenghapusanData;