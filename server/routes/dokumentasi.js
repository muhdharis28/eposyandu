// routes/dokumentasi.js
const express = require('express');
const router = express.Router();
const Dokumentasi = require('../models/dokumentasi');
const multer = require('multer');

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// GET all dokumentasi
router.get('/', async (req, res) => {
  try {
    const dokumentasiList = await Dokumentasi.findAll();
    res.json(dokumentasiList);
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

// GET a single dokumentasi by ID
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

// POST new dokumentasi
router.post('/', upload.single('foto'), async (req, res) => {
  const { judul, deskripsi, tanggal } = req.body;
  const foto = req.file ? `/uploads/${req.file.filename}` : null;

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

// PUT update dokumentasi by ID
router.put('/:id', upload.single('foto'), async (req, res) => {
  const { id } = req.params;
  const { judul, deskripsi, tanggal } = req.body;
  const foto = req.file ? req.file.path : null;

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

// DELETE dokumentasi by ID
router.delete('/:id', async (req, res) => {
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
