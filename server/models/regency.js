// models/Regency.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Provinsi = require('./provinsi');

class Regency extends Model {}

Regency.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    provinsiId: {
        type: DataTypes.INTEGER,
        references: {
            model: Provinsi,
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'Regency',
});

Regency.belongsTo(Provinsi, { as: 'provinsiDetail', foreignKey: 'provinsiId' });

module.exports = Regency;
