const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const OrangTua = require('./orangtua');

class Balita extends Model {}

Balita.init({
    nama_balita: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    orangtua: {
        type: DataTypes.INTEGER,
        references: {
            model: OrangTua,
            key: 'id'
        }
    },
    nik_balita: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    jenis_kelamin_balita: {
        type: DataTypes.ENUM('l','p'),
        allowNull: false,
    },
    tempat_lahir_balita: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_lahir_balita: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    berat_badan_awal_balita: {
        type: DataTypes.INTEGER
    },
    tinggi_badan_awal_balita: {
        type: DataTypes.INTEGER
    },
    riwayat_penyakit_balita: {
        type: DataTypes.STRING
    },
    riwayat_kelahiran_balita: {
        type: DataTypes.STRING
    },
    keterangan_balita: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Balita'
});

module.exports = Balita;