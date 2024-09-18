const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Wali = require('./wali');
const Pekerjaan = require('./pekerjaan');
const Pendidikan = require('./pendidikan');
const Pengguna = require('./pengguna');

class Lansia extends Model {}

Lansia.init({
    no_kk_lansia: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    wali: {
        type: DataTypes.INTEGER,
        references: {
            model: Wali,
            key: 'id'
        }
    },
    kader: {
        type: DataTypes.INTEGER,
        references: {
            model: Pengguna,
            key: 'id'
        }
    },
    nik_lansia: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
    },
    nama_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tempat_lahir_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal_lahir_lansia: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    jenis_kelamin_lansia: {
        type: DataTypes.ENUM('l','p'),
        allowNull: false,
    },
    alamat_ktp_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_ktp_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan_ktp_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota_ktp_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi_ktp_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    alamat_domisili_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kelurahan_domisili_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kecamatan_domisili_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kota_domisili_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    provinsi_domisili_lansia: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    no_hp_lansia: {
        type: DataTypes.STRING
    },
    email_lansia: {
        type: DataTypes.STRING
    },
    pekerjaan_lansia: {
        type: DataTypes.INTEGER,
        references_lansia: {
            model: Pekerjaan,
            key: 'id'
        }
    },
    pendidikan_lansia: {
        type: DataTypes.INTEGER,
        references_lansia: {
            model: Pendidikan,
            key: 'id'
        }
    },
    status_pernikahan_lansia: {
        type: DataTypes.ENUM('Menikah','Duda','Janda','Tidak Menikah'),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Lansia'
});

Lansia.belongsTo(Wali, { as: 'waliDetail', foreignKey: 'wali' });
Lansia.belongsTo(Pendidikan, { as: 'pendidikan', foreignKey: 'pendidikan_lansia' });
Lansia.belongsTo(Pekerjaan, { as: 'pekerjaan', foreignKey: 'pekerjaan_lansia' });
Lansia.belongsTo(Pengguna, { as: 'penggunaDetail', foreignKey: 'kader' });
module.exports = Lansia;