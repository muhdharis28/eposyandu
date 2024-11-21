const express = require('express');
const router = express.Router();
const Dokumentasi = require('../models/dokumentasi');
const Pengguna = require('../models/pengguna');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

router.post('/', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
  try {
    const { judul, deskripsi, tanggal, foto, kader, posyandu } = req.body;

    if (req.user.role !== 'admin') {
      const authenticatedUserPosyanduId = req.user.posyanduId;
      if (authenticatedUserPosyanduId !== posyandu) {
        return res.status(403).json({ error: 'Unauthorized action: posyandu mismatch.' });
      }
    }

    const newDokumentasi = await Dokumentasi.create({
      judul,
      deskripsi,
      tanggal,
      foto,
      kader,
      posyandu,
    });
    res.status(201).json(newDokumentasi);
  } catch (error) {
    console.error('Error creating dokumentasi:', error);
    res.status(500).json({ error: 'Failed to create dokumentasi.' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const dokumentasiList = await Dokumentasi.findAll({
      include: [
        { model: Pengguna, as: 'kaderDetail' },
        { model: Posyandu, as: 'posyanduDetail' },
      ],
    });
    res.status(200).json(dokumentasiList);
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const posyanduId = req.user.posyanduId;
    const userRole = req.user.role;

    const whereClause = userRole === 'admin' ? {} : { posyanduId };

    const dokumentasiList = await Dokumentasi.findAll({
      where: whereClause,
      include: [
        { model: Pengguna, as: 'kaderDetail' },
        { model: Posyandu, as: 'posyanduDetail' },
      ],
    });
    res.status(200).json(dokumentasiList);
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    const { posyandu } = req.query;
    const whereClause = posyandu ? { posyandu } : {};

    const dokumentasiList = await Dokumentasi.findAll({
      where: whereClause,
      include: [
        { model: Pengguna, as: 'kaderDetail' },
        { model: Posyandu, as: 'posyanduDetail' },
      ],
    });
    res.status(200).json(dokumentasiList);
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const posyanduId = req.user.posyanduId;
    const userRole = req.user.role;

    const whereClause = userRole === 'admin' ? { id: req.params.id } : { id: req.params.id, posyandu: posyanduId };

    const dokumentasi = await Dokumentasi.findOne({
      where: whereClause,
      include: [
        { model: Pengguna, as: 'kaderDetail' },
        { model: Posyandu, as: 'posyanduDetail' },
      ],
    });

    if (!dokumentasi) {
      return res.status(404).json({ error: 'Dokumentasi not found' });
    }

    res.status(200).json(dokumentasi);
  } catch (error) {
    console.error('Error fetching dokumentasi:', error);
    res.status(500).json({ error: 'Failed to fetch dokumentasi.' });
  }
});

router.put('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
  try {
    const { judul, deskripsi, tanggal, foto, kader, posyandu } = req.body;
    const posyanduId = req.user.posyanduId;
    const userRole = req.user.role;

    const whereClause = userRole === 'admin' ? { id: req.params.id } : { id: req.params.id, posyandu: posyanduId };

    const dokumentasi = await Dokumentasi.findOne({ where: whereClause });

    if (!dokumentasi) {
      return res.status(404).json({ error: 'Dokumentasi not found' });
    }

    dokumentasi.judul = judul;
    dokumentasi.deskripsi = deskripsi;
    dokumentasi.tanggal = tanggal;
    if (foto) dokumentasi.foto = foto;
    dokumentasi.kader = kader;
    dokumentasi.posyandu = posyandu;
    await dokumentasi.save();

    res.status(200).json(dokumentasi);
  } catch (error) {
    console.error('Error updating dokumentasi:', error);
    res.status(500).json({ error: 'Failed to update dokumentasi.' });
  }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin', 'kader'), async (req, res) => {
  try {
    const posyanduId = req.user.posyanduId;
    const userRole = req.user.role;

    const whereClause = userRole === 'admin' ? { id: req.params.id } : { id: req.params.id, posyandu: posyanduId };

    const dokumentasi = await Dokumentasi.findOne({ where: whereClause });

    if (!dokumentasi) {
      return res.status(404).json({ error: 'Dokumentasi not found' });
    }

    await dokumentasi.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting dokumentasi:', error);
    res.status(500).json({ error: 'Failed to delete dokumentasi.' });
  }
});

module.exports = router;
