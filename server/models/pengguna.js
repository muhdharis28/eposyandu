const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const OrangTua = require('./orangtua');
const Wali = require('./wali');

class Pengguna extends Model {}

Pengguna.init({
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    kata_sandi: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.ENUM('admin', 'kader', 'user')
    },
    no_hp: {
        type: DataTypes.STRING,
        unique: true,
    },
    no_kk: {
        type: DataTypes.BIGINT,
        unique: true,
    },
    no_ktp: {
        type: DataTypes.BIGINT,
        unique: true,
    },
    foto_kk: {
        type: DataTypes.STRING,
    },
    orangtua: {
        type: DataTypes.INTEGER,
        references: {
            model: OrangTua,
            key: 'id'
        }
    },
    wali: {
        type: DataTypes.INTEGER,
        references: {
            model: Wali,
            key: 'id'
        }
    },
    verifikasi: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    sequelize,
    modelName: 'Pengguna'
});

Pengguna.belongsTo(OrangTua, { foreignKey: 'orangtua', as: 'orangTuaDetail' });
Pengguna.belongsTo(Wali, { foreignKey: 'wali', as: 'waliDetail' });

module.exports = Pengguna;
