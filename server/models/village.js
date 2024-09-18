// models/Village.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const District = require('./district');

class Village extends Model {}

Village.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    districtId: {
        type: DataTypes.INTEGER,
        references: {
            model: District,
            key: 'id',
        }
    }
}, {
    sequelize,
    modelName: 'Village',
});

Village.belongsTo(District, { as: 'districtDetail', foreignKey: 'districtId' });

module.exports = Village;
