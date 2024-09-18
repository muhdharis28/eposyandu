// models/District.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Regency = require('./regency');

class District extends Model {}

District.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    regencyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Regency,
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'District',
});

District.belongsTo(Regency, { as: 'regencyDetail', foreignKey: 'regencyId' });

module.exports = District;
