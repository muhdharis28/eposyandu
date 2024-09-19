const express = require('express');
const router = express.Router();
const Dokumentasi = require('../models/dokumentasi');
const Pengguna = require('../models/pengguna');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

// Fetch all dokumentasi records, filtered by posyandu
router.get('/', authenticateToken, async (req, res) => {
  try {
    const posyanduId = req.user.posyanduId; // Get posyanduId from authenticated user
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
      includeOptions.where = { '$kaderDetail.posyandu$': posyanduId };
    }

    const dokumentasiList = await Dokumentasi.findAll({
      include: [includeOptions]
    });

    res.json(dokumentasiList);
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

router.get('/all', async (req, res) => {
  try {
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

    const dokumentasiList = await Dokumentasi.findAll({
      include: [includeOptions]
    });

    res.json(dokumentasiList);
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

// Fetch a single dokumentasi record by ID, filtered by posyandu
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const posyanduId = req.user.posyanduId; // Get posyanduId from authenticated user
  const userRole = req.user.role; // Get the role of the authenticated user

  try {
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
      includeOptions.where = { '$kaderDetail.posyandu$': posyanduId };
    }

    const dokumentasi = await Dokumentasi.findByPk(id, { include: [includeOptions] });

    if (dokumentasi) {
      res.json(dokumentasi);
    } else {
      res.status(404).json({ error: 'Dokumentasi not found.' });
    }
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

// Create a new dokumentasi record
router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
  const { judul, deskripsi, tanggal, foto, kader } = req.body;

  try {
    const newDokumentasi = await Dokumentasi.create({ judul, deskripsi, foto, tanggal, kader });
    res.status(201).json(newDokumentasi);
  } catch (error) {
    console.error('Error creating dokumentasi:', error);
    res.status(500).json({ error: 'Failed to create dokumentasi.' });
  }
});

// Update an existing dokumentasi record
router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, tanggal, foto, kader } = req.body;

  try {
    const dokumentasi = await Dokumentasi.findByPk(id);
    if (dokumentasi) {
      dokumentasi.judul = judul;
      dokumentasi.deskripsi = deskripsi;
      dokumentasi.kader = kader;
      if (foto) dokumentasi.foto = foto;
      dokumentasi.tanggal = tanggal;

      await dokumentasi.save();
      res.json(dokumentasi);
    } else {
      res.status(404).json({ error: 'Dokumentasi not found.' });
    }
  } catch (error) {
    console.error('Error updating dokumentasi:', error);
    res.status(500).json({ error: 'Failed to update dokumentasi.' });
  }
});

// Delete a dokumentasi record
router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
  const { id } = req.params;
  try {
    const dokumentasi = await Dokumentasi.findByPk(id);
    if (dokumentasi) {
      await dokumentasi.destroy();
      res.json({ message: 'Dokumentasi deleted successfully.' });
    } else {
      res.status(404).json({ error: 'Dokumentasi not found.' });
    }
  } catch (error) {
    console.error('Error deleting dokumentasi:', error);
    res.status(500).json({ error: 'Failed to delete dokumentasi.' });
  }
});

module.exports = router;
