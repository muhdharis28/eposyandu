const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const OrangTua = require('./orangtua');
const Wali = require('./wali');
const Posyandu = require('./posyandu');

class Pengguna extends Model {}

Pengguna.init({
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    kata_sandi: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'kader', 'user'),
        allowNull: false,
    },
    no_hp: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    no_kk: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    no_ktp: {
        type: DataTypes.BIGINT,
        unique: true,
        allowNull: false,
    },
    foto_kk: {
        type: DataTypes.STRING,
    },
    orangtua: {
        type: DataTypes.INTEGER,
        references: {
            model: OrangTua,
            key: 'id'
        },
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
    modelName: 'Pengguna'
});

Pengguna.belongsTo(OrangTua, { foreignKey: 'orangtua', as: 'orangTuaDetail' });
Pengguna.belongsTo(Wali, { foreignKey: 'wali', as: 'waliDetail' });
Pengguna.belongsTo(Posyandu, { foreignKey: 'posyandu', as: 'posyanduDetail' });

module.exports = Pengguna;
