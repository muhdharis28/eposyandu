const express = require('express');
const router = express.Router();
const Balita = require('../models/balita');
const OrangTua = require('../models/orangtua');
const Pengguna = require('../models/pengguna');
const Posyandu = require('../models/posyandu');
const {authenticateToken} = require('./middleware/authMiddleware');

// Create new Balita record
router.post('/', authenticateToken, async(req, res) => {
  try {
    const {
      nama_balita,
      orangtua,
      nik_balita,
      jenis_kelamin_balita,
      tempat_lahir_balita,
      tanggal_lahir_balita,
      berat_badan_awal_balita,
      tinggi_badan_awal_balita,
      riwayat_penyakit_balita,
      riwayat_kelahiran_balita,
      keterangan_balita,
      kader,
      posyandu
    } = req.body;

    const newBalita = await Balita.create({
      nama_balita,
      orangtua,
      nik_balita,
      jenis_kelamin_balita,
      tempat_lahir_balita,
      tanggal_lahir_balita,
      berat_badan_awal_balita,
      tinggi_badan_awal_balita,
      riwayat_penyakit_balita,
      riwayat_kelahiran_balita,
      keterangan_balita,
      kader,
      posyandu
    });

    res
      .status(201)
      .json(newBalita);
  } catch (error) {
    res
      .status(500)
      .json({error: error.message});
  }
});

// Get all Balita records, filtered by posyandu
router.get('/', authenticateToken, async (req, res) => {
  const posyanduId = req.user.posyanduId; // Get posyanduId from authenticated user
  const userRole = req.user.role; // Get the role of the authenticated user
  const { orangtua } = req.query; // Get the orangtua parameter from the query string

  try {
    // Define the base filter condition
    const filterCondition = {
      include: [
        {
          model: OrangTua,
          as: 'orangtuaDetail',
          where: {}, // Initialize where condition for OrangTua
          required: false // Allow results even if there's no matching OrangTua
        },
        {
          model: Pengguna,
          as: 'kaderDetail',
          required: false // Allow results even if there's no matching Pengguna
        },
        {
          model: Posyandu,
          as: 'posyanduDetail',
          required: false // Allow results even if there's no matching Posyandu
        }
      ]
    };

    // Apply posyandu filter only if the user is not an admin
    if (userRole !== 'admin') {
      filterCondition.include[2].where = { id: posyanduId };
      filterCondition.include[2].required = true; // Ensure the Posyandu filter is applied
    }

    // Optionally filter by orangtua
    if (orangtua) {
      filterCondition.include[0].where.id = orangtua;
      filterCondition.include[0].required = true; // Ensure the Wali filter is applied
    }

    const balitas = await Balita.findAll(filterCondition);
    res.status(200).json(balitas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single Balita record by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const posyanduId = req.user.posyanduId; // Get posyanduId from authenticated user
  const userRole = req.user.role; // Get the role of the authenticated user

  try {
    // Define the base include condition
    const includeOptions = [
      {
        model: OrangTua,
        as: 'orangtuaDetail'
      },
      {
        model: Pengguna,
        as: 'kaderDetail'
      },
      {
        model: Posyandu,
        as: 'posyanduDetail',
        required: false // Allow results even if there's no matching Posyandu
      }
    ];

    // Apply posyandu filter only if the user is not an admin
    const whereCondition = { id: req.params.id }; // Ensure we are filtering by Balita ID
    if (userRole !== 'admin') {
      includeOptions[2].where = { id: posyanduId };
      includeOptions[2].required = true; // Ensure the Posyandu filter is applied
    }

    const balita = await Balita.findOne({
      where: whereCondition,
      include: includeOptions
    });

    if (balita) {
      res.status(200).json(balita);
    } else {
      res.status(404).json({ error: 'Balita not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Balita record
router.put('/:id', authenticateToken, async(req, res) => {
  try {
    const {
      nama_balita,
      orangtua,
      nik_balita,
      jenis_kelamin_balita,
      tempat_lahir_balita,
      tanggal_lahir_balita,
      berat_badan_awal_balita,
      tinggi_badan_awal_balita,
      riwayat_penyakit_balita,
      riwayat_kelahiran_balita,
      keterangan_balita,
      kader,
      posyandu
    } = req.body;

    const balita = await Balita.findByPk(req.params.id);
    if (balita) {
      await balita.update({
        nama_balita,
        orangtua,
        nik_balita,
        jenis_kelamin_balita,
        tempat_lahir_balita,
        tanggal_lahir_balita,
        berat_badan_awal_balita,
        tinggi_badan_awal_balita,
        riwayat_penyakit_balita,
        riwayat_kelahiran_balita,
        keterangan_balita,
        kader,
        posyandu
      });
      res
        .status(200)
        .json(balita);
    } else {
      res
        .status(404)
        .json({error: 'Balita not found'});
    }
  } catch (error) {
    res
      .status(500)
      .json({error: error.message});
  }
});

// Delete a Balita record
router.delete('/:id', authenticateToken, async(req, res) => {
  try {
    const balita = await Balita.findByPk(req.params.id);
    if (balita) {
      await balita.destroy();
      res
        .status(204)
        .end();
    } else {
      res
        .status(404)
        .json({error: 'Balita not found'});
    }
  } catch (error) {
    res
      .status(500)
      .json({error: error.message});
  }
});

module.exports = router;
