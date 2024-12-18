// models/Dokumentasi.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db.config');
const Pengguna = require('./pengguna');
const Posyandu = require('./posyandu');

const Dokumentasi = sequelize.define('Dokumentasi', {
  judul: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deskripsi: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING, // Assuming this will store the image URL or path
    allowNull: false,
  },
  tanggal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  kader: {
    type: DataTypes.INTEGER,
    references: {
        model: Pengguna,
        key: 'id'
    },
  },
  posyandu: {
    type: DataTypes.INTEGER,
    references: {
        model: Posyandu,
        key: 'id'
    },
    allowNull: false
},
}, {
  timestamps: true,
});

Dokumentasi.belongsTo(Pengguna, { as: 'kaderDetail', foreignKey: 'kader' });
Dokumentasi.belongsTo(Posyandu, { as: 'posyanduDetail', foreignKey: 'posyandu' });

module.exports = Dokumentasi;
