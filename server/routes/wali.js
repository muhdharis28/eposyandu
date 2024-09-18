const express = require('express');
const router = express.Router();
const Wali = require('../models/wali');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', async (req, res) => {
    try {
        const {
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, alamat_ktp_wali, kelurahan_ktp_wali,
            kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, alamat_domisili_wali, kelurahan_domisili_wali,
            kecamatan_domisili_wali, kota_domisili_wali, provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali,
            posyandu
        } = req.body;
        const newWali = await Wali.create({
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, alamat_ktp_wali, kelurahan_ktp_wali,
            kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, alamat_domisili_wali, kelurahan_domisili_wali,
            kecamatan_domisili_wali, kota_domisili_wali, provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali,
            posyandu
        });
        res.status(201).json(newWali);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const walis = await Wali.findAll({
            include: [{
                model: Posyandu,
                as: 'posyanduDetail'
            }]
        });
        res.status(200).json(walis);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const wali = await Wali.findByPk(req.params.id, {
            include: [{
                model: Posyandu,
                as: 'posyanduDetail'
            }]
        });
        if (wali) {
            res.status(200).json(wali);
        } else {
            res.status(404).json({ error: 'Wali not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {
            no_kk, nik_wali, nama_wali, tempat_lahir_wali, tanggal_lahir_wali, jenis_kelamin_wali, alamat_ktp_wali, kelurahan_ktp_wali,
            kecamatan_ktp_wali, kota_ktp_wali, provinsi_ktp_wali, alamat_domisili_wali, kelurahan_domisili_wali,
            kecamatan_domisili_wali, kota_domisili_wali, provinsi_domisili_wali, no_hp_wali, email_wali, pekerjaan_wali, pendidikan_wali,
            posyandu
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
            wali.posyandu = posyandu;
            await wali.save();
            res.status(200).json(wali);
        } else {
            res.status(404).json({ error: 'Wali not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
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