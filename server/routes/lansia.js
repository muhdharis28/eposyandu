const express = require('express');
const router = express.Router();
const Lansia = require('../models/lansia');
const Wali = require('../models/wali');
const Pendidikan = require('../models/pendidikan');
const Pekerjaan = require('../models/pekerjaan');
const Pengguna = require('../models/pengguna');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');
const Sequelize = require('sequelize'); 

router.post('/', authenticateToken, async (req, res) => {
    try {
        const {
            no_kk_lansia,
            wali,
            nik_lansia,
            nama_lansia,
            tempat_lahir_lansia,
            tanggal_lahir_lansia,
            jenis_kelamin_lansia,
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
            kader,
        } = req.body;

        const newLansia = await Lansia.create({
            no_kk_lansia,
            wali,
            nik_lansia,
            nama_lansia,
            tempat_lahir_lansia,
            tanggal_lahir_lansia,
            jenis_kelamin_lansia,
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
            kader,
        });

        res.status(201).json(newLansia);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const { wali } = req.query;  // Get the wali parameter from the query string

    try {
        // If wali is provided, filter lansia by wali, else return all lansia
        const filterCondition = wali ? { where: { wali } } : {};

        const lansias = await Lansia.findAll({
            ...filterCondition,
            include: [{
                model: Wali,
                as: 'waliDetail',
                attributes: ['id', 'nama_wali', 'email_wali', 'no_hp_wali'],
            },
            { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] }]
        });
        
        res.status(200).json(lansias);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/laporan', async (req, res) => {
    try {
        const totalLansia = await Lansia.count();  // Get total number of Lansia
        const averageAgeLansia = await Lansia.findAll({
            attributes: [[Sequelize.fn('AVG', Sequelize.literal('DATEDIFF(CURDATE(), tanggal_lahir_lansia) / 365')), 'average_age']]
        });
        const totalLakiLaki = await Lansia.count({ where: { jenis_kelamin_lansia: 'l' } });
        const totalPerempuan = await Lansia.count({ where: { jenis_kelamin_lansia: 'p' } });
        res.status(200).json({
            totalLansia,
            averageAgeLansia: averageAgeLansia[0].dataValues.average_age,
            totalLakiLaki,
            totalPerempuan
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const lansia = await Lansia.findByPk(req.params.id, {
            include: [{
              model: Wali,
              as: 'waliDetail',
              attributes: ['id', 'nama_wali', 'email_wali', 'no_hp_wali'],
            },
            {
                model: Pekerjaan,
                as: 'pekerjaan',
                attributes: ['id', 'nama'],
            },
            {
                model: Pendidikan,
                as: 'pendidikan',
                attributes: ['id', 'nama'],
            },
            { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] }]
        });
        if (lansia) {
            res.status(200).json(lansia);
        } else {
            res.status(404).json({ error: 'Lansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {
            no_kk_lansia,
            wali,
            nik_lansia,
            nama_lansia,
            tempat_lahir_lansia,
            tanggal_lahir_lansia,
            jenis_kelamin_lansia,
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
            kader,
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
                jenis_kelamin_lansia,
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
                kader,
            });
            res.status(200).json(lansia);
        } else {
            res.status(404).json({ error: 'Lansia not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
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