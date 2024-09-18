require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const port = 4800;

const sequelize = require('./db.config');
sequelize.sync();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes/upload'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/pengguna', require('./routes/pengguna'));
app.use('/api/balita', require('./routes/balita'));
app.use('/api/dokter', require('./routes/dokter'));
app.use('/api/kegiatan', require('./routes/kegiatan'));
app.use('/api/lansia', require('./routes/lansia'));
app.use('/api/orangtua', require('./routes/orangtua'));
app.use('/api/pekerjaan', require('./routes/pekerjaan'));
app.use('/api/pemeriksaan-lansia', require('./routes/pemeriksaan_lansia'));
app.use('/api/pendidikan', require('./routes/pendidikan'));
app.use('/api/perkembangan-balita', require('./routes/perkembangan_balita'));
app.use('/api/wali', require('./routes/wali'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/dokumentasi', require('./routes/dokumentasi'));
app.use('/api/location', require('./routes/location'));

const server = app.listen(port, () => console.log(`running server on port ${port}`));

module.exports = server;