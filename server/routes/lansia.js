const express = require('express');
const router = express.Router();
const Lansia = require('../models/lansia');
const Wali = require('../models/wali');
const Pendidikan = require('../models/pendidikan');
const Pekerjaan = require('../models/pekerjaan');
const Pengguna = require('../models/pengguna');
const Posyandu = require('../models/posyandu');
const {authenticateToken, authorizeRoles} = require('./middleware/authMiddleware');
const Sequelize = require('sequelize');

// Create new Lansia record
router.post('/', authenticateToken, async(req, res) => {
  try {
    const {
      no_kk_lansia,
      wali,
      nik_lansia,
      nama_lansia,
      tempat_lahir_lansia,
      tanggal_lahir_lansia,
      jenis_kelamin_lansia,
      alamat_ktp_lansia,
      kelurahan_ktp_lansia,
      kecamatan_ktp_lansia,
      kota_ktp_lansia,
      provinsi_ktp_lansia,
      alamat_domisili_lansia,
      kelurahan_domisili_lansia,
      kecamatan_domisili_lansia,
      kota_domisili_lansia,
      provinsi_domisili_lansia,
      no_hp_lansia,
      email_lansia,
      pekerjaan_lansia,
      pendidikan_lansia,
      status_pernikahan_lansia,
      kader,
      posyandu
    } = req.body;

    const newLansia = await Lansia.create({
      no_kk_lansia,
      wali,
      nik_lansia,
      nama_lansia,
      tempat_lahir_lansia,
      tanggal_lahir_lansia,
      jenis_kelamin_lansia,
      alamat_ktp_lansia,
      kelurahan_ktp_lansia,
      kecamatan_ktp_lansia,
      kota_ktp_lansia,
      provinsi_ktp_lansia,
      alamat_domisili_lansia,
      kelurahan_domisili_lansia,
      kecamatan_domisili_lansia,
      kota_domisili_lansia,
      provinsi_domisili_lansia,
      no_hp_lansia,
      email_lansia,
      pekerjaan_lansia,
      pendidikan_lansia,
      status_pernikahan_lansia,
      kader,
      posyandu
    });

    res
      .status(201)
      .json(newLansia);
  } catch (error) {
    res
      .status(500)
      .json({error: error.message});
  }
});

router.get('/', authenticateToken, async (req, res) => {
  const posyanduId = req.user.posyanduId;
  const userRole = req.user.role;
  const { wali } = req.query;
  
  try {
    // Define the base filter condition with includes
    const filterCondition = {
      include: [
        {
          model: Wali,
          as: 'waliDetail',
          where: wali ? { id: wali } : undefined,
          required: !!wali, // Only required if `wali` is specified
        },
        {
          model: Posyandu,
          as: 'posyanduDetail',
          where: userRole !== 'admin' ? { id: posyanduId } : undefined,
          required: userRole !== 'admin', // Only required if the user is not an admin
        },
      ],
    };

    const lansias = await Lansia.findAll(filterCondition);
    
    res.status(200).json(lansias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Lansia statistics
router.get('/laporan', async(req, res) => {
  try {
    const totalLansia = await Lansia.count();
    const averageAgeLansia = await Lansia.findAll({
      attributes: [
        [
          Sequelize.fn('AVG', Sequelize.literal('DATEDIFF(CURDATE(), tanggal_lahir_lansia) / 365')),
          'average_age'
        ]
      ]
    });
    const totalLakiLaki = await Lansia.count({
      where: {
        jenis_kelamin_lansia: 'l'
      }
    });
    const totalPerempuan = await Lansia.count({
      where: {
        jenis_kelamin_lansia: 'p'
      }
    });
    res
      .status(200)
      .json({totalLansia, averageAgeLansia: averageAgeLansia[0].dataValues.average_age, totalLakiLaki, totalPerempuan});
  } catch (error) {
    res
      .status(500)
      .json({error: error.message});
  }
});

// Get a single Lansia record by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const posyanduId = req.user.posyanduId;
    const userRole = req.user.role; // Get the role of the authenticated user

    const includeOptions = [
      {
        model: Wali,
        as: 'waliDetail'
      },
      {
        model: Pekerjaan,
        as: 'pekerjaan'
      },
      {
        model: Pendidikan,
        as: 'pendidikan'
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
    if (userRole !== 'admin') {
      includeOptions[4].where = { id: posyanduId };
      includeOptions[4].required = true; // Ensure the Posyandu filter is applied
    }

    const lansia = await Lansia.findByPk(req.params.id, {
      include: includeOptions
    });

    if (lansia) {
      res.status(200).json(lansia);
    } else {
      res.status(404).json({ error: 'Lansia not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a Lansia record
router.put('/:id', authenticateToken, async(req, res) => {
  try {
    const {
      no_kk_lansia,
      wali,
      nik_lansia,
      nama_lansia,
      tempat_lahir_lansia,
      tanggal_lahir_lansia,
      jenis_kelamin_lansia,
      alamat_ktp_lansia,
      kelurahan_ktp_lansia,
      kecamatan_ktp_lansia,
      kota_ktp_lansia,
      provinsi_ktp_lansia,
      alamat_domisili_lansia,
      kelurahan_domisili_lansia,
      kecamatan_domisili_lansia,
      kota_domisili_lansia,
      provinsi_domisili_lansia,
      no_hp_lansia,
      email_lansia,
      pekerjaan_lansia,
      pendidikan_lansia,
      status_pernikahan_lansia,
      kader,
      posyandu
    } = req.body;

    const lansia = await Lansia.findByPk(req.params.id);
    if (lansia) {
      await lansia.update({
        no_kk_lansia,
        wali,
        nik_lansia,
        nama_lansia,
        tempat_lahir_lansia,
        tanggal_lahir_lansia,
        jenis_kelamin_lansia,
        alamat_ktp_lansia,
        kelurahan_ktp_lansia,
        kecamatan_ktp_lansia,
        kota_ktp_lansia,
        provinsi_ktp_lansia,
        alamat_domisili_lansia,
        kelurahan_domisili_lansia,
        kecamatan_domisili_lansia,
        kota_domisili_lansia,
        provinsi_domisili_lansia,
        no_hp_lansia,
        email_lansia,
        pekerjaan_lansia,
        pendidikan_lansia,
        status_pernikahan_lansia,
        kader,
        posyandu
      });
      res
        .status(200)
        .json(lansia);
    } else {
      res
        .status(404)
        .json({error: 'Lansia not found'});
    }
  } catch (error) {
    res
      .status(500)
      .json({error: error.message});
  }
});

// Delete a Lansia record
router.delete('/:id', authenticateToken, async(req, res) => {
  try {
    const lansia = await Lansia.findByPk(req.params.id);
    if (lansia) {
      await lansia.destroy();
      res
        .status(204)
        .end();
    } else {
      res
        .status(404)
        .json({error: 'Lansia not found'});
    }
  } catch (error) {
    res
      .status(500)
      .json({error: error.message});
  }
});

module.exports = router;
