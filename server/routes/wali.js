const express = require('express');
const router = express.Router();
const Wali = require('../models/wali');  // Adjust the path as needed

// Create a new Wali
router.post('/', async (req, res) => {
    try {
        const {
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, alamat_ktp_wali, kelurahan_ktp_wali,
            kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, alamat_domisili_wali, kelurahan_domisili_wali,
            kecamatan_domisili_wali, kota_domisili_wali, provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali
        } = req.body;
        const newWali = await Wali.create({
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, alamat_ktp_wali, kelurahan_ktp_wali,
            kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, alamat_domisili_wali, kelurahan_domisili_wali,
            kecamatan_domisili_wali, kota_domisili_wali, provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali
        });
        res.status(201).json(newWali);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Read all Walis
router.get('/', async (req, res) => {
    try {
        const walis = await Wali.findAll();
        res.status(200).json(walis);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Read a single Wali by ID
router.get('/:id', async (req, res) => {
    try {
        const wali = await Wali.findByPk(req.params.id);
        if (wali) {
            res.status(200).json(wali);
        } else {
            res.status(404).json({ error: 'Wali not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Update a Wali by ID
router.put('/:id', async (req, res) => {
    try {
        const {
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, alamat_ktp_wali, kelurahan_ktp_wali,
            kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, alamat_domisili_wali, kelurahan_domisili_wali,
            kecamatan_domisili_wali, kota_domisili_wali, provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali
        } = req.body;
        const wali = await Wali.findByPk(req.params.id);
        if (wali) {
            wali.no_kk = no_kk;
            wali.nik_wali = nik_wali;
            wali.nama_wali = nama_wali;
            wali.tempat_lahir_wali = tempat_lahir_wali;
            wali.tanggal_lahir_wali = tanggal_lahir_wali;
            wali.jenis_kelamin_wali = jenis_kelamin_wali;
            wali.alamat_ktp_wali = alamat_ktp_wali;
            wali.kelurahan_ktp_wali = kelurahan_ktp_wali;
            wali.kecamatan_ktp_wali = kecamatan_ktp_wali;
            wali.kota_ktp_wali = kota_ktp_wali;
            wali.provinsi_ktp_wali = provinsi_ktp_wali;
            wali.alamat_domisili_wali = alamat_domisili_wali;
            wali.kelurahan_domisili_wali = kelurahan_domisili_wali;
            wali.kecamatan_domisili_wali = kecamatan_domisili_wali;
            wali.kota_domisili_wali = kota_domisili_wali;
            wali.provinsi_domisili_wali = provinsi_domisili_wali;
            wali.no_hp_wali = no_hp_wali;
            wali.email_wali = email_wali;
            wali.pekerjaan_wali = pekerjaan_wali;
            wali.pendidikan_wali = pendidikan_wali;
            await wali.save();
            res.status(200).json(wali);
        } else {
            res.status(404).json({ error: 'Wali not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Delete a Wali by ID
router.delete('/:id', async (req, res) => {
    try {
        const wali = await Wali.findByPk(req.params.id);
        if (wali) {
            await wali.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Wali not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
