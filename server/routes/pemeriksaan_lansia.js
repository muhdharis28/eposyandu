const express = require('express');
const router = express.Router();
const PemeriksaanLansia = require('../models/pemeriksaan_lansia');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter
        } = req.body;
        const newPemeriksaanLansia = await PemeriksaanLansia.create({
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter
        });
        res.status(201).json(newPemeriksaanLansia);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const pemeriksaanLansias = await PemeriksaanLansia.findAll();
        res.status(200).json(pemeriksaanLansias);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const pemeriksaanLansia = await PemeriksaanLansia.findByPk(req.params.id);
        if (pemeriksaanLansia) {
            res.status(200).json(pemeriksaanLansia);
        } else {
            res.status(404).json({ error: 'PemeriksaanLansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter
        } = req.body;
        const pemeriksaanLansia = await PemeriksaanLansia.findByPk(req.params.id);
        if (pemeriksaanLansia) {
            pemeriksaanLansia.lansia = lansia;
            pemeriksaanLansia.tanggal_kunjungan = tanggal_kunjungan;
            pemeriksaanLansia.berat_badan = berat_badan;
            pemeriksaanLansia.tinggi_badan = tinggi_badan;
            pemeriksaanLansia.lingkar_perut = lingkar_perut;
            pemeriksaanLansia.tekanan_darah = tekanan_darah;
            pemeriksaanLansia.gula_darah = gula_darah;
            pemeriksaanLansia.kolestrol = kolestrol;
            pemeriksaanLansia.asam_urat = asam_urat;
            pemeriksaanLansia.kesehatan_mata = kesehatan_mata;
            pemeriksaanLansia.keterangan = keterangan;
            pemeriksaanLansia.riwayat_obat = riwayat_obat;
            pemeriksaanLansia.riwayat_penyakit = riwayat_penyakit;
            pemeriksaanLansia.kader = kader;
            pemeriksaanLansia.dokter = dokter;
            await pemeriksaanLansia.save();
            res.status(200).json(pemeriksaanLansia);
        } else {
            res.status(404).json({ error: 'PemeriksaanLansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const pemeriksaanLansia = await PemeriksaanLansia.findByPk(req.params.id);
        if (pemeriksaanLansia) {
            await pemeriksaanLansia.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'PemeriksaanLansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;