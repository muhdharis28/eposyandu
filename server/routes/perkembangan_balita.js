const express = require('express');
const router = express.Router();
const PerkembanganBalita = require('../models/perkembangan_balita');
const Balita = require('../models/balita');
const Pengguna = require('../models/pengguna');
const Dokter = require('../models/dokter');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

// Create a new PerkembanganBalita record
router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter
        } = req.body;

        // Ensure the perkembangan is associated with the authenticated user's posyandu
        const posyanduId = req.user.posyanduId;

        const newPerkembanganBalita = await PerkembanganBalita.create({
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter, posyandu: posyanduId // Associate with posyandu
        });

        res.status(201).json(newPerkembanganBalita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all PerkembanganBalita records, filtered by posyandu
router.get('/', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;  // Get posyanduId from authenticated user
        const userRole = req.user.role;  // Get the role of the authenticated user

        const filterCondition = {
            include: [
                { model: Balita, as: 'balitaDetail', attributes: ['id', 'nama_balita'] },
                { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] },
                { model: Dokter, as: 'dokterDetail', attributes: ['id', 'nama'] },
            ]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            filterCondition.where = { '$kaderDetail.posyandu$': posyanduId };
        }

        const perkembanganBalitas = await PerkembanganBalita.findAll(filterCondition);
        res.status(200).json(perkembanganBalitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all perkembangan records for a specific Balita, filtered by posyandu
router.get('/balita/:balita', authenticateToken, async (req, res) => {
    try {
        const { balita } = req.params;
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;  // Get the role of the authenticated user

        const filterCondition = {
            where: { balita }, // Filter by balita
            order: [['tanggal_kunjungan', 'DESC']],
            include: [
                { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] },
                { model: Dokter, as: 'dokterDetail', attributes: ['id', 'nama'] },
            ]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            filterCondition.where['$kaderDetail.posyandu$'] = posyanduId;
        }

        const perkembangans = await PerkembanganBalita.findAll(filterCondition);

        if (perkembangans.length > 0) {
            res.status(200).json(perkembangans);
        } else {
            res.status(404).json({ message: 'No Perkembangan found for this balita' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Perkembangan' });
    }
});

// Get a single PerkembanganBalita record by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;  // Get the role of the authenticated user

        const filterCondition = {
            include: [
                { model: Balita, as: 'balitaDetail', attributes: ['id', 'nama_balita'] },
                { model: Pengguna, as: 'kaderDetail', include: [{ model: Posyandu, as: 'posyanduDetail' }] },
                { model: Dokter, as: 'dokterDetail', attributes: ['id', 'nama'] },
            ]
        };

        // Apply posyandu filter only if the user is not an admin
        if (userRole !== 'admin') {
            filterCondition.where = { '$kaderDetail.posyandu$': posyanduId };
        }

        const perkembanganBalita = await PerkembanganBalita.findByPk(req.params.id, filterCondition);

        if (perkembanganBalita) {
            res.status(200).json(perkembanganBalita);
        } else {
            res.status(404).json({ error: 'PerkembanganBalita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a PerkembanganBalita record
router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter
        } = req.body;

        const perkembanganBalita = await PerkembanganBalita.findByPk(req.params.id);
        if (perkembanganBalita) {
            // Ensure the update is within the authenticated user's posyandu
            const posyanduId = req.user.posyanduId;
            if (perkembanganBalita.posyandu !== posyanduId) {
                return res.status(403).json({ error: 'Unauthorized action: PerkembanganBalita does not belong to your posyandu.' });
            }

            await perkembanganBalita.update({
                balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
                tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter
            });
            res.status(200).json(perkembanganBalita);
        } else {
            res.status(404).json({ error: 'PerkembanganBalita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a PerkembanganBalita record
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const perkembanganBalita = await PerkembanganBalita.findByPk(req.params.id);
        if (perkembanganBalita) {
            // Ensure the delete is within the authenticated user's posyandu
            const posyanduId = req.user.posyanduId;
            if (perkembanganBalita.posyandu !== posyanduId) {
                return res.status(403).json({ error: 'Unauthorized action: PerkembanganBalita does not belong to your posyandu.' });
            }

            await perkembanganBalita.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'PerkembanganBalita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
