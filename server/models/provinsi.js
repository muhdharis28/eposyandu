// models/Provinsi.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');

class Provinsi extends Model {}

Provinsi.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }
}, {
    sequelize,
    modelName: 'Provinsi',
});

module.exports = Provinsi;
