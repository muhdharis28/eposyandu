const express = require('express');
const router = express.Router();
const PenghapusanData = require('../models/penghapusan_data');
const Pengguna = require('../models/pengguna');
const { authenticateToken } = require('./middleware/authMiddleware');

// POST endpoint to create new data
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { pengguna, nama, status } = req.body;
        const newPenghapusanData = await PenghapusanData.create({ pengguna, nama, status });
        res.status(201).json(newPenghapusanData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET endpoint to retrieve all data
router.get('/', authenticateToken, async (req, res) => {
    try {
        const penghapusanDatas = await PenghapusanData.findAll();
        res.status(200).json(penghapusanDatas);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// GET endpoint to retrieve deletion requests by pengguna ID
router.get('/:penggunaId', authenticateToken, async (req, res) => {
    try {
        const { penggunaId } = req.params; // Extract pengguna ID from the request parameters
        const deletionRequests = await PenghapusanData.findAll({
            where: { pengguna: penggunaId } // Find deletion requests by pengguna ID
        });
        res.status(200).json(deletionRequests);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// DELETE endpoint to remove data by ID
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const penghapusanData = await PenghapusanData.findByPk(req.params.id);
        if (penghapusanData) {
            // Find the associated Pengguna and delete it
            const pengguna = await Pengguna.findByPk(penghapusanData.pengguna);
            if (pengguna) {
                await pengguna.destroy();
            }
            // Delete the PenghapusanData
            await penghapusanData.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'PenghapusanData not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// PUT endpoint to update status by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body; // Extract the status from the request body
        const penghapusanData = await PenghapusanData.findByPk(req.params.id);
        
        if (!penghapusanData) {
            return res.status(404).json({ error: 'PenghapusanData not found' });
        }

        // Update the status
        penghapusanData.status = status;
        await penghapusanData.save();

        res.status(200).json(penghapusanData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
