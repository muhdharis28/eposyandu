const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Pendidikan = require('./pendidikan');
const Pekerjaan = require('./pekerjaan');

class OrangTua extends Model {}

OrangTua.init({
    no_kk: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
    },
    nik_ibu: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    nama_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tempat_lahir_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_lahir_ibu: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    alamat_ktp_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_ktp_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan_ktp_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota_ktp_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi_ktp_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat_domisili_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_domisili_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan_domisili_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota_domisili_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi_domisili_ibu: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_hp_ibu: {
        type: DataTypes.INTEGER
    },
    email_ibu: {
        type: DataTypes.STRING
    },
    pekerjaan_ibu: {
        type: DataTypes.INTEGER,
        references: {
            model: Pekerjaan,
            key: 'id'
        }
    },
    pendidikan_ibu: {
        type: DataTypes.INTEGER,
        references: {
            model: Pendidikan,
            key: 'id'
        }
    },
    nik_ayah: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    nama_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tempat_lahir_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_lahir_ayah: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    alamat_ktp_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_ktp_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan_ktp_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota_ktp_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi_ktp_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat_domisili_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_domisili_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan_domisili_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota_domisili_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi_domisili_ayah: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_hp_ayah: {
        type: DataTypes.INTEGER
    },
    email_ayah: {
        type: DataTypes.STRING
    },
    pekerjaan_ayah: {
        type: DataTypes.INTEGER,
        references: {
            model: Pekerjaan,
            key: 'id'
        }
    },
    pendidikan_ayah: {
        type: DataTypes.INTEGER,
        references: {
            model: Pendidikan,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'OrangTua'
});

module.exports = OrangTua;
