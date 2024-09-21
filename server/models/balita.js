const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const OrangTua = require('./orangtua');
const Pengguna = require('./pengguna');

class Balita extends Model {}

Balita.init({
    nama_balita: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orangtua: {
        type: DataTypes.INTEGER,
        references: {
            model: OrangTua,
            key: 'id'
        },
        allowNull: false,
    },
    kader: {
        type: DataTypes.INTEGER,
        references: {
            model: Pengguna,
            key: 'id'
        },
        allowNull: false,
    },
    nik_balita: {
        type: DataTypes.BIGINT,
        allowNull: false
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
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    tinggi_badan_awal_balita: {
        type: DataTypes.INTEGER,
        allowNull: false,
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

Balita.belongsTo(OrangTua, { as: 'orangtuaDetail', foreignKey: 'orangtua' });
Balita.belongsTo(Pengguna, { as: 'kaderDetail', foreignKey: 'kader' });

module.exports = Balita;