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
        res.status(500).json({ error: error });
    }
});

// Read all Balitas
router.get('/', async (req, res) => {
    try {
        const balitas = await Balita.findAll();
        res.status(200).json(balitas);
    } catch (error) {
        res.status(500).json({ error: error });
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
        res.status(500).json({ error: error });
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
            balita.nama_balita = nama_balita;
            balita.orangtua = orangtua;
            balita.nama_balita = nama_balita;
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
        res.status(500).json({ error: error });
    }
});

module.exports = router;
