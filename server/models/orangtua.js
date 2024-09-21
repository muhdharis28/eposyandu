const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Pendidikan = require('./pendidikan');
const Pekerjaan = require('./pekerjaan');
const Posyandu = require('./posyandu');

class OrangTua extends Model {}

OrangTua.init({
    no_kk: {
        type: DataTypes.BIGINT,
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
    },
    kelurahan_ktp_ibu: {
        type: DataTypes.STRING,
    },
    kecamatan_ktp_ibu: {
        type: DataTypes.STRING,
    },
    kota_ktp_ibu: {
        type: DataTypes.STRING,
    },
    provinsi_ktp_ibu: {
        type: DataTypes.STRING,
    },
    alamat_domisili_ibu: {
        type: DataTypes.STRING,
    },
    kelurahan_domisili_ibu: {
        type: DataTypes.STRING,
    },
    kecamatan_domisili_ibu: {
        type: DataTypes.STRING,
    },
    kota_domisili_ibu: {
        type: DataTypes.STRING,
    },
    provinsi_domisili_ibu: {
        type: DataTypes.STRING,
    },
    no_hp_ibu: {
        type: DataTypes.STRING
    },
    email_ibu: {
        type: DataTypes.STRING
    },
    pekerjaan_ibu: {
        type: DataTypes.INTEGER,
        references: {
            model: Pekerjaan,
            key: 'id'
        },
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
    },
    kelurahan_ktp_ayah: {
        type: DataTypes.STRING,
    },
    kecamatan_ktp_ayah: {
        type: DataTypes.STRING,
    },
    kota_ktp_ayah: {
        type: DataTypes.STRING,
    },
    provinsi_ktp_ayah: {
        type: DataTypes.STRING,
    },
    alamat_domisili_ayah: {
        type: DataTypes.STRING,
    },
    kelurahan_domisili_ayah: {
        type: DataTypes.STRING,
    },
    kecamatan_domisili_ayah: {
        type: DataTypes.STRING,
    },
    kota_domisili_ayah: {
        type: DataTypes.STRING,
    },
    provinsi_domisili_ayah: {
        type: DataTypes.STRING,
    },
    no_hp_ayah: {
        type: DataTypes.STRING
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
    modelName: 'OrangTua'
});

OrangTua.belongsTo(Posyandu, { as: 'posyanduDetail', foreignKey: 'posyandu' });

module.exports = OrangTua;
