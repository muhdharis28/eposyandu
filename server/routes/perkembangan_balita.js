const express = require('express');
const router = express.Router();
const PerkembanganBalita = require('../models/perkembangan_balita');  // Adjust the path as needed

// Create a new PerkembanganBalita
router.post('/', async (req, res) => {
    try {
        const {
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter
        } = req.body;
        const newPerkembanganBalita = await PerkembanganBalita.create({
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter
        });
        res.status(201).json(newPerkembanganBalita);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Read all PerkembanganBalitas
router.get('/', async (req, res) => {
    try {
        const perkembanganBalitas = await PerkembanganBalita.findAll();
        res.status(200).json(perkembanganBalitas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Read a single PerkembanganBalita by ID
router.get('/:id', async (req, res) => {
    try {
        const perkembanganBalita = await PerkembanganBalita.findByPk(req.params.id);
        if (perkembanganBalita) {
            res.status(200).json(perkembanganBalita);
        } else {
            res.status(404).json({ error: 'PerkembanganBalita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Update a PerkembanganBalita by ID
router.put('/:id', async (req, res) => {
    try {
        const {
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter
        } = req.body;
        const perkembanganBalita = await PerkembanganBalita.findByPk(req.params.id);
        if (perkembanganBalita) {
            perkembanganBalita.balita = balita;
            perkembanganBalita.tanggal_kunjungan = tanggal_kunjungan;
            perkembanganBalita.berat_badan = berat_badan;
            perkembanganBalita.tinggi_badan = tinggi_badan;
            perkembanganBalita.status_gizi = status_gizi;
            perkembanganBalita.keterangan = keterangan;
            perkembanganBalita.tipe_imunisasi = tipe_imunisasi;
            perkembanganBalita.tipe_vitamin = tipe_vitamin;
            perkembanganBalita.lingkar_kepala = lingkar_kepala;
            perkembanganBalita.kader = kader;
            perkembanganBalita.dokter = dokter;
            await perkembanganBalita.save();
            res.status(200).json(perkembanganBalita);
        } else {
            res.status(404).json({ error: 'PerkembanganBalita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Delete a PerkembanganBalita by ID
router.delete('/:id', async (req, res) => {
    try {
        const perkembanganBalita = await PerkembanganBalita.findByPk(req.params.id);
        if (perkembanganBalita) {
            await perkembanganBalita.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'PerkembanganBalita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
