const express = require('express');
const router = express.Router();
const Kegiatan = require('../models/kegiatan');
const Pengguna = require('../models/pengguna');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const { nama, tanggal, jenis, deskripsi, kader } = req.body;
        const newKegiatan = await Kegiatan.create({ nama, tanggal, jenis, deskripsi, kader });
        res.status(201).json(newKegiatan);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const kegiatans = await Kegiatan.findAll({
            include: [
              { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] }
            ]
          });
        res.status(200).json(kegiatans);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findByPk(req.params.id, {
            include: [
              { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] }
            ]
          });
        if (kegiatan) {
            res.status(200).json(kegiatan);
        } else {
            res.status(404).json({ error: 'Kegiatan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const { nama, tanggal, jenis, deskripsi } = req.body;
        const kegiatan = await Kegiatan.findByPk(req.params.id);
        if (kegiatan) {
            kegiatan.nama = nama;
            kegiatan.tanggal = tanggal;
            kegiatan.jenis = jenis;
            kegiatan.deskripsi = deskripsi;
            await kegiatan.save();
            res.status(200).json(kegiatan);
        } else {
            res.status(404).json({ error: 'Kegiatan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const kegiatan = await Kegiatan.findByPk(req.params.id);
        if (kegiatan) {
            await kegiatan.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Kegiatan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;