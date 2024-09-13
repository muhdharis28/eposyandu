const express = require('express');
const router = express.Router();
const PerkembanganBalita = require('../models/perkembangan_balita');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
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

router.get('/', authenticateToken, async (req, res) => {
    try {
        const perkembanganBalitas = await PerkembanganBalita.findAll();
        res.status(200).json(perkembanganBalitas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
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

router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
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

router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
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