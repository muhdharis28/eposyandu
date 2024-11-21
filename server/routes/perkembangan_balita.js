const express = require('express');
const router = express.Router();
const PerkembanganBalita = require('../models/perkembangan_balita');
const Balita = require('../models/balita');
const Pengguna = require('../models/pengguna');
const Dokter = require('../models/dokter');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter, posyandu
        } = req.body;

        const newPerkembanganBalita = await PerkembanganBalita.create({
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter, posyandu
        });

        res.status(201).json(newPerkembanganBalita);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    const posyanduId = req.user.posyanduId;
    const userRole = req.user.role;
    const { balita } = req.query;

    try {
        const filterCondition = {
            include: [
                {
                    model: Balita,
                    as: 'balitaDetail',
                    where: balita ? { id: balita } : undefined,
                    required: !!balita
                },
                {
                    model: Posyandu,
                    as: 'posyanduDetail',
                    where: userRole !== 'admin' ? { id: posyanduId } : undefined,
                    required: userRole !== 'admin'
                },
                {
                    model: Pengguna,
                    as: 'kaderDetail'
                },
                {
                    model: Dokter,
                    as: 'dokterDetail'
                }
            ]
        };

        const perkembanganBalitas = await PerkembanganBalita.findAll(filterCondition);
        res.status(200).json(perkembanganBalitas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/balita/:balita', authenticateToken, async (req, res) => {
    try {
        const { balita } = req.params;
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;

        const filterCondition = {
            include: [
                {
                    model: Balita,
                    as: 'balitaDetail',
                    where: balita ? { id: balita } : undefined,
                    required: !!balita
                },
                {
                    model: Posyandu,
                    as: 'posyanduDetail',
                    where: userRole !== 'admin' ? { id: posyanduId } : undefined,
                    required: userRole !== 'admin'
                },
                {
                    model: Pengguna,
                    as: 'kaderDetail'
                },
                {
                    model: Dokter,
                    as: 'dokterDetail'
                }
            ]
        };

        const perkembangans = await PerkembanganBalita.findAll(filterCondition);

        if (perkembangans.length > 0) {
            res.status(200).json(perkembangans);
        } else {
            res.status(404).json({ message: 'No Perkembangan found for this balita' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Perkembangan', error });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const filterCondition = {
            include: [
                { model: Balita, as: 'balitaDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
                { model: Pengguna, as: 'kaderDetail' },
                { model: Dokter, as: 'dokterDetail' },
            ]
        };

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

router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const {
            balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
            tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter, posyandu
        } = req.body;

        const perkembanganBalita = await PerkembanganBalita.findByPk(req.params.id);
        if (perkembanganBalita) {
            await perkembanganBalita.update({
                balita, tanggal_kunjungan, berat_badan, tinggi_badan, status_gizi, keterangan,
                tipe_imunisasi, tipe_vitamin, lingkar_kepala, kader, dokter, posyandu
            });
            res.status(200).json(perkembanganBalita);
        } else {
            res.status(404).json({ error: 'PerkembanganBalita not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
    try {
        const perkembanganBalita = await PerkembanganBalita.findByPk(req.params.id);
        if (perkembanganBalita) {
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
