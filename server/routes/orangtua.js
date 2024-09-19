const express = require('express');
const router = express.Router();
const OrangTua = require('../models/orangtua');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

// Create a new OrangTua record
router.post('/', authenticateToken, async (req, res) => {
    try {
        const {
            no_kk, nik_ibu, nama_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, alamat_ktp_ibu, kelurahan_ktp_ibu,
            kecamatan_ktp_ibu, kota_ktp_ibu, provinsi_ktp_ibu, alamat_domisili_ibu, kelurahan_domisili_ibu,
            kecamatan_domisili_ibu, kota_domisili_ibu, provinsi_domisili_ibu, no_hp_ibu, email_ibu, pekerjaan_ibu,
            pendidikan_ibu, nik_ayah, nama_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, alamat_ktp_ayah, kelurahan_ktp_ayah,
            kecamatan_ktp_ayah, kota_ktp_ayah, provinsi_ktp_ayah, alamat_domisili_ayah, kelurahan_domisili_ayah,
            kecamatan_domisili_ayah, kota_domisili_ayah, provinsi_domisili_ayah, no_hp_ayah, email_ayah, pekerjaan_ayah,
            pendidikan_ayah
        } = req.body;

        // Ensure the created OrangTua is associated with the authenticated user's posyandu
        const posyanduId = req.user.posyanduId;

        const newOrangTua = await OrangTua.create({
            no_kk, nik_ibu, nama_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, alamat_ktp_ibu, kelurahan_ktp_ibu,
            kecamatan_ktp_ibu, kota_ktp_ibu, provinsi_ktp_ibu, alamat_domisili_ibu, kelurahan_domisili_ibu,
            kecamatan_domisili_ibu, kota_domisili_ibu, provinsi_domisili_ibu, no_hp_ibu, email_ibu, pekerjaan_ibu,
            pendidikan_ibu, nik_ayah, nama_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, alamat_ktp_ayah, kelurahan_ktp_ayah,
            kecamatan_ktp_ayah, kota_ktp_ayah, provinsi_ktp_ayah, alamat_domisili_ayah, kelurahan_domisili_ayah,
            kecamatan_domisili_ayah, kota_domisili_ayah, provinsi_domisili_ayah, no_hp_ayah, email_ayah, pekerjaan_ayah,
            pendidikan_ayah, posyandu: posyanduId  // Associate with the authenticated user's posyandu
        });
        res.status(201).json(newOrangTua);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all OrangTua records, with optional filtering by posyandu
router.get('/', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId; // Get posyanduId from authenticated user
        const userRole = req.user.role; // Get the role of the authenticated user

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

        const orangTuas = await OrangTua.findAll(filterCondition);
        res.status(200).json(orangTuas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a single OrangTua record by ID
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

        const orangTua = await OrangTua.findByPk(req.params.id, filterCondition);

        if (orangTua) {
            res.status(200).json(orangTua);
        } else {
            res.status(404).json({ error: 'OrangTua not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an OrangTua record
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {
            no_kk, nik_ibu, nama_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, alamat_ktp_ibu, kelurahan_ktp_ibu,
            kecamatan_ktp_ibu, kota_ktp_ibu, provinsi_ktp_ibu, alamat_domisili_ibu, kelurahan_domisili_ibu,
            kecamatan_domisili_ibu, kota_domisili_ibu, provinsi_domisili_ibu, no_hp_ibu, email_ibu, pekerjaan_ibu,
            pendidikan_ibu, nik_ayah, nama_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, alamat_ktp_ayah, kelurahan_ktp_ayah,
            kecamatan_ktp_ayah, kota_ktp_ayah, provinsi_ktp_ayah, alamat_domisili_ayah, kelurahan_domisili_ayah,
            kecamatan_domisili_ayah, kota_domisili_ayah, provinsi_domisili_ayah, no_hp_ayah, email_ayah, pekerjaan_ayah,
            pendidikan_ayah
        } = req.body;

        const orangTua = await OrangTua.findByPk(req.params.id);
        if (orangTua) {
            // Ensure the update is within the authenticated user's posyandu
            const posyanduId = req.user.posyanduId;
            if (orangTua.posyandu !== posyanduId) {
                return res.status(403).json({ error: 'Unauthorized action: OrangTua does not belong to your posyandu.' });
            }

            await orangTua.update({
                no_kk, nik_ibu, nama_ibu, tempat_lahir_ibu, tanggal_lahir_ibu, alamat_ktp_ibu, kelurahan_ktp_ibu,
                kecamatan_ktp_ibu, kota_ktp_ibu, provinsi_ktp_ibu, alamat_domisili_ibu, kelurahan_domisili_ibu,
                kecamatan_domisili_ibu, kota_domisili_ibu, provinsi_domisili_ibu, no_hp_ibu, email_ibu, pekerjaan_ibu,
                pendidikan_ibu, nik_ayah, nama_ayah, tempat_lahir_ayah, tanggal_lahir_ayah, alamat_ktp_ayah, kelurahan_ktp_ayah,
                kecamatan_ktp_ayah, kota_ktp_ayah, provinsi_ktp_ayah, alamat_domisili_ayah, kelurahan_domisili_ayah,
                kecamatan_domisili_ayah, kota_domisili_ayah, provinsi_domisili_ayah, no_hp_ayah, email_ayah, pekerjaan_ayah,
                pendidikan_ayah, posyandu: posyanduId  // Ensure the posyandu is updated
            });
            res.status(200).json(orangTua);
        } else {
            res.status(404).json({ error: 'OrangTua not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an OrangTua record
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const orangTua = await OrangTua.findByPk(req.params.id);
        if (orangTua) {
            // Ensure the delete is within the authenticated user's posyandu
            const posyanduId = req.user.posyanduId;
            if (orangTua.posyandu !== posyanduId) {
                return res.status(403).json({ error: 'Unauthorized action: OrangTua does not belong to your posyandu.' });
            }

            await orangTua.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'OrangTua not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
