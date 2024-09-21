const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Pendidikan = require('./pendidikan');
const Pekerjaan = require('./pekerjaan');
const Posyandu = require('./posyandu');

class Wali extends Model {}

Wali.init({
    no_kk: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
    },
    kelurahan_ktp_wali: {
        type: DataTypes.STRING,
    },
    kecamatan_ktp_wali: {
        type: DataTypes.STRING,
    },
    kota_ktp_wali: {
        type: DataTypes.STRING,
    },
    provinsi_ktp_wali: {
        type: DataTypes.STRING,
    },
    alamat_domisili_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_domisili_wali: {
        type: DataTypes.STRING,
    },
    kecamatan_domisili_wali: {
        type: DataTypes.STRING,
    },
    kota_domisili_wali: {
        type: DataTypes.STRING,
    },
    provinsi_domisili_wali: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_hp_wali: {
        type: DataTypes.STRING
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
    posyandu: {
        type: DataTypes.INTEGER,
        references: {
            model: Posyandu,
            key: 'id'
        },
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Wali'
});

Wali.belongsTo(Posyandu, { as: 'posyanduDetail', foreignKey: 'posyandu' });

module.exports = Wali;
