const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Pendidikan = require('./pendidikan');
const Pekerjaan = require('./pekerjaan');
const Pengguna = require('./pengguna');

class Wali extends Model {}

Wali.init({
    no_kk: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    nik_wali: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    nama_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tempat_lahir_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_lahir_wali: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    jenis_kelamin_wali: {
        type: DataTypes.ENUM('l','p'),
        allowNull: false,
    },
    alamat_ktp_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_ktp_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan_ktp_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota_ktp_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi_ktp_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat_domisili_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_domisili_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan_domisili_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota_domisili_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi_domisili_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_hp_wali: {
        type: DataTypes.BIGINT
    },
    email_wali: {
        type: DataTypes.STRING
    },
    pekerjaan_wali: {
        type: DataTypes.INTEGER,
        references: {
            model: Pekerjaan,
            key: 'id'
        }
    },
    pendidikan_wali: {
        type: DataTypes.INTEGER,
        references: {
            model: Pendidikan,
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'Wali'
});

module.exports = Wali;
