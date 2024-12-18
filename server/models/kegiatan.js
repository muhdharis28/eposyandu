const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Pengguna = require('./pengguna');
const Posyandu = require('./posyandu');

class Kegiatan extends Model {}

Kegiatan.init({
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    tanggal: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    jenis: {
        type: DataTypes.ENUM('balita','lansia'),
        allowNull: false,
    },
    deskripsi: {
        type: DataTypes.STRING
    },
    kader: {
        type: DataTypes.INTEGER,
        references: {
            model: Pengguna,
            key: 'id'
        },
    },
    posyandu: {
        type: DataTypes.INTEGER,
        references: {
            model: Posyandu,
            key: 'id'
        },
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Kegiatan'
});

Kegiatan.belongsTo(Pengguna, { as: 'kaderDetail', foreignKey: 'kader' });
Kegiatan.belongsTo(Posyandu, { as: 'posyanduDetail', foreignKey: 'posyandu' });

module.exports = Kegiatan;