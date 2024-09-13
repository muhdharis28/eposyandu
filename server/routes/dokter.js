const express = require('express');
const router = express.Router();
const Dokter = require('../models/dokter');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { nama } = req.body;
        const newDokter = await Dokter.create({ nama });
        res.status(201).json(newDokter);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const dokters = await Dokter.findAll();
        res.status(200).json(dokters);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const dokter = await Dokter.findByPk(req.params.id);
        if (dokter) {
            res.status(200).json(dokter);
        } else {
            res.status(404).json({ error: 'Dokter not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { nama } = req.body;
        const dokter = await Dokter.findByPk(req.params.id);
        if (dokter) {
            dokter.nama = nama;
            await dokter.save();
            res.status(200).json(dokter);
        } else {
            res.status(404).json({ error: 'Dokter not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const dokter = await Dokter.findByPk(req.params.id);
        if (dokter) {
            await dokter.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Dokter not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;