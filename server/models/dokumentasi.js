// models/Dokumentasi.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db.config');

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
}, {
  timestamps: true,
});

module.exports = Dokumentasi;
