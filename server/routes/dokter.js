// dokter.js
const express = require('express');
const router = express.Router();
const Dokter = require('../models/dokter');  // Adjust the path as needed
const { authenticateToken, authorizeRole } = require('./authMiddleware'); // Import middleware

// Create a new Dokter (authenticated and authorized as admin)
router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const { nama } = req.body;
        const newDokter = await Dokter.create({ nama });
        res.status(201).json(newDokter);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read all Dokters (authenticated)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const dokters = await Dokter.findAll();
        res.status(200).json(dokters);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read a single Dokter by ID (authenticated)
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const dokter = await Dokter.findByPk(req.params.id);
        if (dokter) {
            res.status(200).json(dokter);
        } else {
            res.status(404).json({ error: 'Dokter not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Dokter by ID (authenticated and authorized as admin)
router.put('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
});

// Delete a Dokter by ID (authenticated and authorized as admin)
router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const dokter = await Dokter.findByPk(req.params.id);
        if (dokter) {
            await dokter.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Dokter not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
