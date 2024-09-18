const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class Posyandu extends Model {}

Posyandu.init({
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Posyandu'
});

module.exports = Posyandu;