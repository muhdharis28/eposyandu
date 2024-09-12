// routes/lansiaRoutes.js

const express = require('express');
const router = express.Router();
const Lansia = require('../models/lansia'); // Adjust the path as needed
const { authenticateToken, authorizeRole } = require('./middleware/authMiddleware'); // Import the middleware

// Create a new Lansia (Admin Only)
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const {
            no_kk_lansia,
            wali,
            nik_lansia,
            nama_lansia,
            tempat_lahir_lansia,
            tanggal_lahir_lansia,
            alamat_ktp_lansia,
            kelurahan_ktp_lansia,
            kecamatan_ktp_lansia,
            kota_ktp_lansia,
            provinsi_ktp_lansia,
            alamat_domisili_lansia,
            kelurahan_domisili_lansia,
            kecamatan_domisili_lansia,
            kota_domisili_lansia,
            provinsi_domisili_lansia,
            no_hp_lansia,
            email_lansia,
            pekerjaan_lansia,
            pendidikan_lansia,
            status_pernikahan_lansia,
        } = req.body;

        const newLansia = await Lansia.create({
            no_kk_lansia,
            wali,
            nik_lansia,
            nama_lansia,
            tempat_lahir_lansia,
            tanggal_lahir_lansia,
            alamat_ktp_lansia,
            kelurahan_ktp_lansia,
            kecamatan_ktp_lansia,
            kota_ktp_lansia,
            provinsi_ktp_lansia,
            alamat_domisili_lansia,
            kelurahan_domisili_lansia,
            kecamatan_domisili_lansia,
            kota_domisili_lansia,
            provinsi_domisili_lansia,
            no_hp_lansia,
            email_lansia,
            pekerjaan_lansia,
            pendidikan_lansia,
            status_pernikahan_lansia,
        });

        res.status(201).json(newLansia);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Read all Lansias (Authenticated Users)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const lansias = await Lansia.findAll();
        res.status(200).json(lansias);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Read a single Lansia by ID (Authenticated Users)
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const lansia = await Lansia.findByPk(req.params.id);
        if (lansia) {
            res.status(200).json(lansia);
        } else {
            res.status(404).json({ error: 'Lansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Update a Lansia by ID (Admin Only)
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const {
            no_kk_lansia,
            wali,
            nik_lansia,
            nama_lansia,
            tempat_lahir_lansia,
            tanggal_lahir_lansia,
            alamat_ktp_lansia,
            kelurahan_ktp_lansia,
            kecamatan_ktp_lansia,
            kota_ktp_lansia,
            provinsi_ktp_lansia,
            alamat_domisili_lansia,
            kelurahan_domisili_lansia,
            kecamatan_domisili_lansia,
            kota_domisili_lansia,
            provinsi_domisili_lansia,
            no_hp_lansia,
            email_lansia,
            pekerjaan_lansia,
            pendidikan_lansia,
            status_pernikahan_lansia,
        } = req.body;

        const lansia = await Lansia.findByPk(req.params.id);
        if (lansia) {
            await lansia.update({
                no_kk_lansia,
                wali,
                nik_lansia,
                nama_lansia,
                tempat_lahir_lansia,
                tanggal_lahir_lansia,
                alamat_ktp_lansia,
                kelurahan_ktp_lansia,
                kecamatan_ktp_lansia,
                kota_ktp_lansia,
                provinsi_ktp_lansia,
                alamat_domisili_lansia,
                kelurahan_domisili_lansia,
                kecamatan_domisili_lansia,
                kota_domisili_lansia,
                provinsi_domisili_lansia,
                no_hp_lansia,
                email_lansia,
                pekerjaan_lansia,
                pendidikan_lansia,
                status_pernikahan_lansia,
            });
            res.status(200).json(lansia);
        } else {
            res.status(404).json({ error: 'Lansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Delete a Lansia by ID (Admin Only)
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const lansia = await Lansia.findByPk(req.params.id);
        if (lansia) {
            await lansia.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Lansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
