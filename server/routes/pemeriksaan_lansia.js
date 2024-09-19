const express = require('express');
const router = express.Router();
const PemeriksaanLansia = require('../models/pemeriksaan_lansia');
const Lansia = require('../models/lansia');
const Pengguna = require('../models/pengguna');
const Dokter = require('../models/dokter');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

// Create a new PemeriksaanLansia record
router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter
        } = req.body;

        // Ensure the pemeriksaan is associated with the authenticated user's posyandu
        const posyanduId = req.user.posyanduId;

        const newPemeriksaanLansia = await PemeriksaanLansia.create({
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter, posyandu: posyanduId // Associate with posyandu
        });

        res.status(201).json(newPemeriksaanLansia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all PemeriksaanLansia records, filtered by posyandu
router.get('/', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;  // Get posyanduId from authenticated user
        const userRole = req.user.role;  // Get the role of the authenticated user

        const filterCondition = {
            include: [
                { model: Lansia, as: 'lansiaDetail' },
                { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] },
                { model: Dokter, as: 'dokterDetail' },
            ]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            filterCondition.where = { '$kaderDetail.posyandu$': posyanduId };
        }

        const pemeriksaanLansias = await PemeriksaanLansia.findAll(filterCondition);
        res.status(200).json(pemeriksaanLansias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single PemeriksaanLansia record by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;  // Get the role of the authenticated user

        const filterCondition = {
            include: [
                { model: Lansia, as: 'lansiaDetail' },
                { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] },
                { model: Dokter, as: 'dokterDetail' },
            ]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            filterCondition.where = { '$kaderDetail.posyandu$': posyanduId };
        }

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

// Get all pemeriksaan records for a specific Lansia, filtered by posyandu
router.get('/lansia/:lansia', authenticateToken, async (req, res) => {
    try {
        const { lansia } = req.params;
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;  // Get the role of the authenticated user

        const filterCondition = {
            where: { lansia }, // Filter by lansia
            order: [['tanggal_kunjungan', 'DESC']],
            include: [
                { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] },
                { model: Dokter, as: 'dokterDetail' },
            ]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            filterCondition.where['$kaderDetail.posyandu$'] = posyanduId;
        }

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

// Update a PemeriksaanLansia record
router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
            gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
            riwayat_penyakit, kader, dokter
        } = req.body;

        const pemeriksaanLansia = await PemeriksaanLansia.findByPk(req.params.id);
        if (pemeriksaanLansia) {
            // Ensure the update is within the authenticated user's posyandu
            // const posyanduId = req.user.posyanduId;
            // if (pemeriksaanLansia.posyandu !== posyanduId) {
            //     return res.status(403).json({ error: 'Unauthorized action: PemeriksaanLansia does not belong to your posyandu.' });
            // }

            await pemeriksaanLansia.update({
                lansia, tanggal_kunjungan, berat_badan, tinggi_badan, lingkar_perut, tekanan_darah, 
                gula_darah, kolestrol, asam_urat, kesehatan_mata, keterangan, riwayat_obat, 
                riwayat_penyakit, kader, dokter
            });
            res.status(200).json(pemeriksaanLansia);
        } else {
            res.status(404).json({ error: 'PemeriksaanLansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a PemeriksaanLansia record
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const pemeriksaanLansia = await PemeriksaanLansia.findByPk(req.params.id);
        if (pemeriksaanLansia) {
            // Ensure the delete is within the authenticated user's posyandu
            // const posyanduId = req.user.posyanduId;
            // if (pemeriksaanLansia.posyandu !== posyanduId) {
            //     return res.status(403).json({ error: 'Unauthorized action: PemeriksaanLansia does not belong to your posyandu.' });
            // }

            await pemeriksaanLansia.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'PemeriksaanLansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
