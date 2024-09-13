const express = require('express');
const router = express.Router();
const Dokumentasi = require('../models/dokumentasi');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    const dokumentasiList = await Dokumentasi.findAll();
    res.json(dokumentasiList);
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const dokumentasi = await Dokumentasi.findByPk(id);
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

router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
  const { judul, deskripsi, tanggal, foto } = req.body;

  try {
    const newDokumentasi = await Dokumentasi.create({
      judul,
      deskripsi,
      foto,
      tanggal,
    });
    res.status(201).json(newDokumentasi);
  } catch (error) {
    console.error('Error creating dokumentasi:', error);
    res.status(500).json({ error: 'Failed to create dokumentasi.' });
  }
});

router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, tanggal, foto } = req.body;

  try {
    const dokumentasi = await Dokumentasi.findByPk(id);
    if (dokumentasi) {
      dokumentasi.judul = judul;
      dokumentasi.deskripsi = deskripsi;
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
