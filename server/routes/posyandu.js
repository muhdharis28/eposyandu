const express = require('express');
const router = express.Router();
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { nama, alamat } = req.body;
        const newPosyandu = await Posyandu.create({ nama, alamat });
        res.status(201).json(newPosyandu);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', async (req, res) => {
    try {
        const posyandus = await Posyandu.findAll();
        res.status(200).json(posyandus);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const posyandu = await Posyandu.findByPk(req.params.id);
        if (posyandu) {
            res.status(200).json(posyandu);
        } else {
            res.status(404).json({ error: 'Posyandu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.put('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const { nama, alamat } = req.body;
        const posyandu = await Posyandu.findByPk(req.params.id);
        if (posyandu) {
            posyandu.nama = nama;
            posyandu.alamat = alamat;
            await posyandu.save();
            res.status(200).json(posyandu);
        } else {
            res.status(404).json({ error: 'Posyandu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const posyandu = await Posyandu.findByPk(req.params.id);
        if (posyandu) {
            await posyandu.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Posyandu not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;