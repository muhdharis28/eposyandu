const express = require('express');
const router = express.Router();
const Balita = require('../models/balita');  // Adjust the path as needed

// Create a new Balita
router.post('/', async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
});

// Read all Balitas
router.get('/', async (req, res) => {
    try {
        const balitas = await Balita.findAll();
        res.status(200).json(balitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single Balita by ID
router.get('/:id', async (req, res) => {
    try {
        const balita = await Balita.findByPk(req.params.id);
        if (balita) {
            res.status(200).json(balita);
        } else {
            res.status(404).json({ error: 'Balita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Balita by ID
router.put('/:id', async (req, res) => {
    try {
        const {
            nama_balita, orangtua, nik_balita, jenis_kelamin_balita, tempat_lahir_balita, tanggal_lahir_balita,
            berat_badan_awal_balita, tinggi_badan_awal_balita, riwayat_penyakit_balita, riwayat_kelahiran_balita, keterangan_balita
        } = req.body;
        const balita = await Balita.findByPk(req.params.id);
        if (balita) {
            balita.nama = nama_balita;
            balita.orangtua = orangtua;
            balita.nik = nik_balita;
            balita.jenis_kelamin = jenis_kelamin_balita;
            balita.tempat_lahir = tempat_lahir_balita;
            balita.tanggal_lahir = tanggal_lahir_balita;
            balita.berat_badan_awal = berat_badan_awal_balita;
            balita.tinggi_badan_awal = tinggi_badan_awal_balita;
            balita.riwayat_penyakit = riwayat_penyakit_balita;
            balita.riwayat_kelahiran = riwayat_kelahiran_balita;
            balita.keterangan = keterangan_balita;
            await balita.save();
            res.status(200).json(balita);
        } else {
            res.status(404).json({ error: 'Balita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Balita by ID
router.delete('/:id', async (req, res) => {
    try {
        const balita = await Balita.findByPk(req.params.id);
        if (balita) {
            await balita.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Balita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
