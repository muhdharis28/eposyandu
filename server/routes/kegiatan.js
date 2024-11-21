const express = require('express');
const router = express.Router();
const Kegiatan = require('../models/kegiatan');
const Pengguna = require('../models/pengguna');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const { nama, tanggal, jenis, deskripsi, kader, posyandu } = req.body;
        
        if (req.user.role !== 'admin') {
            const authenticatedUserPosyanduId = req.user.posyanduId;
            if (authenticatedUserPosyanduId !== posyandu) {
                return res.status(403).json({ error: 'Unauthorized action: posyandu mismatch.' });
            }
        }

        const newKegiatan = await Kegiatan.create({
            nama,
            tanggal,
            jenis,
            deskripsi,
            kader,
            posyandu,
        });
        res.status(201).json(newKegiatan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const kegiatans = await Kegiatan.findAll({
            include: [
                { model: Pengguna, as: 'kaderDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
            ],
        });
        res.status(200).json(kegiatans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;


        const whereClause = userRole === 'admin' ? {} : { posyanduId };

        const kegiatans = await Kegiatan.findAll({
            where: whereClause,
            include: [
                { model: Pengguna, as: 'kaderDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
            ],
        });
        res.status(200).json(kegiatans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        const { posyandu } = req.query;
        const whereClause = posyandu ? { posyandu } : {};

        const kegiatans = await Kegiatan.findAll({
            where: whereClause,
            include: [
                { model: Pengguna, as: 'kaderDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
            ],
        });
        res.status(200).json(kegiatans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;


        const whereClause = userRole === 'admin' ? { id: req.params.id } : { id: req.params.id, posyanduId };

        const kegiatan = await Kegiatan.findOne({
            where: whereClause,
            include: [
                { model: Pengguna, as: 'kaderDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
            ],
        });

        if (!kegiatan) {
            return res.status(404).json({ error: 'Kegiatan not found' });
        }

        res.status(200).json(kegiatan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const { nama, tanggal, jenis, deskripsi, kader, posyandu } = req.body;
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;

        const whereClause = userRole === 'admin' ? { id: req.params.id } : { id: req.params.id, posyanduId };

        const kegiatan = await Kegiatan.findOne({ where: whereClause });

        if (!kegiatan) {
            return res.status(404).json({ error: 'Kegiatan not found' });
        }

        kegiatan.nama = nama;
        kegiatan.tanggal = tanggal;
        kegiatan.jenis = jenis;
        kegiatan.deskripsi = deskripsi;
        kegiatan.kader = kader;
        kegiatan.posyandu = posyandu;
        await kegiatan.save();

        res.status(200).json(kegiatan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;

        const whereClause = userRole === 'admin' ? { id: req.params.id } : { id: req.params.id, posyanduId };

        const kegiatan = await Kegiatan.findOne({ where: whereClause });

        if (!kegiatan) {
            return res.status(404).json({ error: 'Kegiatan not found' });
        }

        await kegiatan.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
