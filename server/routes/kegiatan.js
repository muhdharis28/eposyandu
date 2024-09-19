const express = require('express');
const router = express.Router();
const Kegiatan = require('../models/kegiatan');
const Pengguna = require('../models/pengguna');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

// Create a new Kegiatan record
router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const { nama, tanggal, jenis, deskripsi, kader } = req.body;

        // Ensure that the kader belongs to the same posyandu as the authenticated user
        const authenticatedUserPosyanduId = req.user.posyanduId;
        const kaderUser = await Pengguna.findByPk(kader, {
            include: [{ model: Posyandu, as: 'posyanduDetail' }]
        });

        if (kaderUser.posyandu !== authenticatedUserPosyanduId) {
            return res.status(403).json({ error: 'Unauthorized action: kader does not belong to your posyandu.' });
        }

        const newKegiatan = await Kegiatan.create({ nama, tanggal, jenis, deskripsi, kader });
        res.status(201).json(newKegiatan);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/all', async (req, res) => {
    try {
        const kegiatans = await Kegiatan.findAll({
            include: [
                {
                    model: Pengguna,
                    as: 'kaderDetail',
                    include: [
                        {
                            model: Posyandu,
                            as: 'posyanduDetail'
                        }
                    ]
                }
            ]
        });
        res.status(200).json(kegiatans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all Kegiatan records associated with the authenticated user's posyandu
router.get('/', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role; // Get the role of the authenticated user

        // Define the base include options
        const includeOptions = {
            model: Pengguna,
            as: 'kaderDetail',
            include: [
                {
                    model: Posyandu,
                    as: 'posyanduDetail'
                }
            ]
        };

        // Apply the posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            includeOptions.include[0].where = { id: posyanduId };
        }

        const kegiatans = await Kegiatan.findAll({
            include: [includeOptions]
        });
        
        res.status(200).json(kegiatans);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Get a specific Kegiatan record by ID, filtered by posyandu
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role; // Get the role of the authenticated user

        const includeOptions = {
            model: Pengguna,
            as: 'kaderDetail',
            include: [
                {
                    model: Posyandu,
                    as: 'posyanduDetail'
                }
            ]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            includeOptions.include[0].where = { id: posyanduId };
        }

        const kegiatan = await Kegiatan.findByPk(req.params.id, { include: [includeOptions] });

        if (kegiatan) {
            res.status(200).json(kegiatan);
        } else {
            res.status(404).json({ error: 'Kegiatan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a specific Kegiatan record by ID
router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const { nama, tanggal, jenis, deskripsi } = req.body;

        const posyanduId = req.user.posyanduId;
        const kegiatan = await Kegiatan.findByPk(req.params.id, {
            include: [
                {
                    model: Pengguna,
                    as: 'kaderDetail',
                    include: [
                        {
                            model: Posyandu,
                            as: 'posyanduDetail',
                            where: { id: posyanduId }
                        }
                    ]
                }
            ]
        });

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
        res.status(500).json({ error: error.message });
    }
});

// Delete a specific Kegiatan record by ID
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;

        const kegiatan = await Kegiatan.findByPk(req.params.id, {
            include: [
                {
                    model: Pengguna,
                    as: 'kaderDetail',
                    include: [
                        {
                            model: Posyandu,
                            as: 'posyanduDetail',
                            where: { id: posyanduId }
                        }
                    ]
                }
            ]
        });

        if (kegiatan) {
            await kegiatan.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Kegiatan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
