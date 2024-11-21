const express = require('express');
const router = express.Router();
const Wali = require('../models/wali');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', async (req, res) => {
    try {
        const {
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, 
            alamat_ktp_wali, kelurahan_ktp_wali, kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, 
            alamat_domisili_wali, kelurahan_domisili_wali, kecamatan_domisili_wali, kota_domisili_wali, 
            provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali, posyandu
        } = req.body;

        // Ensure the wali is associated with the authenticated user's posyandu
        // const posyanduId = req.user.posyanduId;

        const newWali = await Wali.create({
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, 
            alamat_ktp_wali, kelurahan_ktp_wali, kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, 
            alamat_domisili_wali, kelurahan_domisili_wali, kecamatan_domisili_wali, kota_domisili_wali, 
            provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali, posyandu: posyandu // Associate with posyandu
        });

        res.status(201).json(newWali);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all Wali records, filtered by posyandu
router.get('/', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;  // Get posyanduId from authenticated user
        const userRole = req.user.role;  // Get the role of the authenticated user

        const filterCondition = {
            include: [{
                model: Posyandu,
                as: 'posyanduDetail'
            }]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            filterCondition.where = { posyandu: posyanduId };
        }

        const walis = await Wali.findAll(filterCondition);
        res.status(200).json(walis);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single Wali record by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;  // Get the role of the authenticated user

        const filterCondition = {
            include: [{
                model: Posyandu,
                as: 'posyanduDetail'
            }]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            filterCondition.where = { posyandu: posyanduId };
        }

        const wali = await Wali.findByPk(req.params.id, filterCondition);
        if (wali) {
            res.status(200).json(wali);
        } else {
            res.status(404).json({ error: 'Wali not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Wali record
router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, 
            alamat_ktp_wali, kelurahan_ktp_wali, kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, 
            alamat_domisili_wali, kelurahan_domisili_wali, kecamatan_domisili_wali, kota_domisili_wali, 
            provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali
        } = req.body;

        const posyanduId = req.user.posyanduId;
        const wali = await Wali.findByPk(req.params.id);

        if (wali) {
            // Ensure the update is within the authenticated user's posyandu
            // if (wali.posyandu !== posyanduId) {
            //     return res.status(403).json({ error: 'Unauthorized action: Wali does not belong to your posyandu.' });
            // }

            await wali.update({
                no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, 
                alamat_ktp_wali, kelurahan_ktp_wali, kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, 
                alamat_domisili_wali, kelurahan_domisili_wali, kecamatan_domisili_wali, kota_domisili_wali, 
                provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali
            });
            res.status(200).json(wali);
        } else {
            res.status(404).json({ error: 'Wali not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a Wali record
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const wali = await Wali.findByPk(req.params.id);

        if (wali) {
            // Ensure the delete is within the authenticated user's posyandu
            // if (wali.posyandu !== posyanduId) {
            //     return res.status(403).json({ error: 'Unauthorized action: Wali does not belong to your posyandu.' });
            // }

            await wali.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Wali not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
