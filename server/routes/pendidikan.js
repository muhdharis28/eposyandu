const express = require('express');
const router = express.Router();
const Pendidikan = require('../models/pendidikan');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { nama } = req.body;
        const newPendidikan = await Pendidikan.create({ nama });
        res.status(201).json(newPendidikan);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const pendidikans = await Pendidikan.findAll();
        res.status(200).json(pendidikans);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const pendidikan = await Pendidikan.findByPk(req.params.id);
        if (pendidikan) {
            res.status(200).json(pendidikan);
        } else {
            res.status(404).json({ error: 'Pendidikan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { nama } = req.body;
        const pendidikan = await Pendidikan.findByPk(req.params.id);
        if (pendidikan) {
            pendidikan.nama = nama;
            await pendidikan.save();
            res.status(200).json(pendidikan);
        } else {
            res.status(404).json({ error: 'Pendidikan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const pendidikan = await Pendidikan.findByPk(req.params.id);
        if (pendidikan) {
            await pendidikan.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Pendidikan not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;