const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Lansia = require('./lansia');
const Pengguna = require('./pengguna');
const Dokter = require('./dokter');

class PemeriksaanLansia extends Model {}

PemeriksaanLansia.init({
    lansia: {
        type: DataTypes.INTEGER,
        references: {
            model: Lansia,
            key: 'id'
        }
    },
    tanggal_kunjungan: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    berat_badan: {
        type: DataTypes.FLOAT
    },
    tinggi_badan: {
        type: DataTypes.INTEGER
    },
    lingkar_perut: {
        type: DataTypes.INTEGER
    },
    tekanan_darah: {
        type: DataTypes.STRING
    },
    gula_darah: {
        type: DataTypes.STRING
    },
    kolestrol: {
        type: DataTypes.STRING
    },
    asam_urat: {
        type: DataTypes.STRING
    },
    kesehatan_mata: {
        type: DataTypes.STRING
    },
    keterangan: {
        type: DataTypes.STRING
    },
    riwayat_obat: {
        type: DataTypes.STRING
    },
    riwayat_penyakit: {
        type: DataTypes.STRING
    },
    kader: {
        type: DataTypes.INTEGER,
        references: {
            model: Pengguna,
            key: 'id'
        }
    },
    dokter: {
        type: DataTypes.INTEGER,
        references: {
            model: Dokter,
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'PemeriksaanLansia'
});

PemeriksaanLansia.belongsTo(Lansia, { as: 'lansiaDetail', foreignKey: 'lansia' });
PemeriksaanLansia.belongsTo(Pengguna, { as: 'kaderDetail', foreignKey: 'kader' });
PemeriksaanLansia.belongsTo(Dokter, { as: 'dokterDetail', foreignKey: 'dokter' });

module.exports = PemeriksaanLansia;
