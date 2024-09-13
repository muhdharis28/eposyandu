const express = require('express');
const router = express.Router();
const Balita = require('../models/balita');
const OrangTua = require('../models/orangtua');
const { authenticateToken } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, async (req, res) => {
    try {
        const {
            nama_balita, orangtua, nik_balita, jenis_kelamin_balita, tempat_lahir_balita, tanggal_lahir_balita,
            berat_badan_awal_balita, tinggi_badan_awal_balita, riwayat_penyakit_balita, riwayat_kelahiran_balita, keterangan_balita
        } = req.body;
        const newBalita = await Balita.create({
            nama_balita, orangtua, nik_balita, jenis_kelamin_balita, tempat_lahir_balita, tanggal_lahir_balita,
            berat_badan_awal_balita, tinggi_badan_awal_balita, riwayat_penyakit_balita, riwayat_kelahiran_balita, keterangan_balita
        });
        res.status(201).json(newBalita);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const balitas = await Balita.findAll({
            include: [{
                model: OrangTua,
                as: 'orangtuaDetail',
                attributes: ['id', 'nama_ayah', 'nama_ibu'],
              }]
        });
        res.status(200).json(balitas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const balita = await Balita.findByPk(req.params.id, {
            include: [{
                model: OrangTua,
                as: 'orangtuaDetail',
                attributes: ['id', 'nama_ayah', 'nama_ibu'],
              }]
        });
        if (balita) {
            res.status(200).json(balita);
        } else {
            res.status(404).json({ error: 'Balita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {
            nama_balita, orangtua, nik_balita, jenis_kelamin_balita, tempat_lahir_balita, tanggal_lahir_balita,
            berat_badan_awal_balita, tinggi_badan_awal_balita, riwayat_penyakit_balita, riwayat_kelahiran_balita, keterangan_balita
        } = req.body;
        const balita = await Balita.findByPk(req.params.id);
        if (balita) {
            balita.nama_balita = nama_balita;
            balita.orangtua = orangtua;
            balita.nik_balita = nik_balita;
            balita.jenis_kelamin_balita = jenis_kelamin_balita;
            balita.tempat_lahir_balita = tempat_lahir_balita;
            balita.tanggal_lahir_balita = tanggal_lahir_balita;
            balita.berat_badan_awal_balita = berat_badan_awal_balita;
            balita.tinggi_badan_awal_balita = tinggi_badan_awal_balita;
            balita.riwayat_penyakit_balita = riwayat_penyakit_balita;
            balita.riwayat_kelahiran_balita = riwayat_kelahiran_balita;
            balita.keterangan_balita = keterangan_balita;
            await balita.save();
            res.status(200).json(balita);
        } else {
            res.status(404).json({ error: 'Balita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const balita = await Balita.findByPk(req.params.id);
        if (balita) {
            await balita.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Balita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;