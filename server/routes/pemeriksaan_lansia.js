const express = require('express');
const router = express.Router();
const PemeriksaanLansia = require('../models/pemeriksaan_lansia');
const Lansia = require('../models/lansia');
const Pengguna = require('../models/pengguna');
const Dokter = require('../models/dokter');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter, posyandu
        } = req.body;

        const newPemeriksaanLansia = await PemeriksaanLansia.create({
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter, posyandu
        });

        res.status(201).json(newPemeriksaanLansia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const posyanduId = req.user.posyanduId;
    const userRole = req.user.role;
    const { lansia } = req.query;

    try {
        const filterCondition = {
            include: [
                {
                    model: Lansia,
                    as: 'lansiaDetail',
                    where: lansia ? { id: lansia } : undefined,
                    required: !!lansia
                },
                {
                    model: Posyandu,
                    as: 'posyanduDetail',
                    where: userRole !== 'admin' ? { id: posyanduId } : undefined,
                    required: userRole !== 'admin'
                },
                {
                    model: Pengguna,
                    as: 'kaderDetail',
                },
                {
                    model: Dokter,
                    as: 'dokterDetail'
                }
            ]
        };

        const pemeriksaanLansias = await PemeriksaanLansia.findAll(filterCondition);
        res.status(200).json(pemeriksaanLansias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {

        const filterCondition = {
            include: [
                { model: Lansia, as: 'lansiaDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
                { model: Pengguna, as: 'kaderDetail' },
                { model: Dokter, as: 'dokterDetail' },
            ]
        };

        const pemeriksaanLansia = await PemeriksaanLansia.findByPk(req.params.id, filterCondition);

        if (pemeriksaanLansia) {
            res.status(200).json(pemeriksaanLansia);
        } else {
            res.status(404).json({ error: 'PemeriksaanLansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/lansia/:lansia', authenticateToken, async (req, res) => {
    try {
        const { lansia } = req.params;
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;

        const filterCondition = {
            where: userRole !== 'admin' ? { posyandu: posyanduId } : {},
            include: [
                {
                    model: Lansia,
                    as: 'lansiaDetail',
                    where: { id: lansia },
                    required: true
                },
                {
                    model: Posyandu,
                    as: 'posyanduDetail',
                    where: userRole !== 'admin' ? { id: posyanduId } : undefined,
                    required: userRole !== 'admin'
                },
                {
                    model: Pengguna,
                    as: 'kaderDetail'
                },
                {
                    model: Dokter,
                    as: 'dokterDetail'
                }
            ]
        };

        const pemeriksaans = await PemeriksaanLansia.findAll(filterCondition);

        if (pemeriksaans.length > 0) {
            res.status(200).json(pemeriksaans);
        } else {
            res.status(404).json({ message: 'No pemeriksaan found for this Lansia' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pemeriksaan' });
    }
});

router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter, posyandu
        } = req.body;

        const pemeriksaanLansia = await PemeriksaanLansia.findByPk(req.params.id);
        await pemeriksaanLansia.update({
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter, posyandu
        });

        res.status(200).json(pemeriksaanLansia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const pemeriksaanLansia = await PemeriksaanLansia.findByPk(req.params.id);
        await pemeriksaanLansia.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
