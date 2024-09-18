const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Pengguna = require('./pengguna');

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
        }
    },
}, {
    sequelize,
    modelName: 'Kegiatan'
});

Kegiatan.belongsTo(Pengguna, { as: 'kaderDetail', foreignKey: 'kader' });

module.exports = Kegiatan;