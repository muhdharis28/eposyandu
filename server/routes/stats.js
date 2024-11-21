const express = require('express');
const router = express.Router();
const User = require('../models/pengguna');
const Kegiatan = require('../models/kegiatan');
const OrangTua = require('../models/orangtua');
const Bayi = require('../models/balita');
const Dokter = require('../models/dokter');
const Wali = require('../models/wali');
const Lansia = require('../models/lansia');
const Pengguna = require('../models/pengguna');
const { authenticateToken } = require('./middleware/authMiddleware');

router.get('/authenticated', authenticateToken, async (req, res) => {
  try {
    const posyanduId = req.posyanduId;

    const userCount = await User.count({ where: { role: 'user', posyandu: posyanduId } });
        const kaderCount = await User.count({ where: { role: 'kader', posyandu: posyanduId } });
        const dokterCount = await Dokter.count();
        const waliCount = await Wali.count({ where: { posyandu: posyanduId } });
        const kegiatanCount = await Kegiatan.count({
            include: [{
                model: Pengguna,
                as: 'kaderDetail',
                where: { posyandu: posyanduId }
            }]
        });
        const orangtuaCount = await OrangTua.count({ where: { posyandu: posyanduId } });
        const bayiCount = await Bayi.count({
          include: [{
              model: Pengguna,
              as: 'kaderDetail',
              where: { posyandu: posyanduId }
          }]
      });
        const lansiaCount = await Lansia.count({
          include: [{
              model: Pengguna,
              as: 'kaderDetail',
              where: { posyandu: posyanduId }
          }]
      });

    const stats = [
      { label: 'User', value: userCount, icon: '👤', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
      { label: 'Kegiatan', value: kegiatanCount, icon: '📅', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
      { label: 'Kader', value: kaderCount, icon: '👩‍⚕️', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
      { label: 'Dokter', value: dokterCount, icon: '🩺', bgColor: 'bg-red-100', textColor: 'text-red-700' },
      { label: 'Wali', value: waliCount, icon: '👨‍👩‍👧‍👦', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { label: 'Orangtua', value: orangtuaCount, icon: '🧑‍🤝‍🧑', bgColor: 'bg-green-100', textColor: 'text-green-700' },
      { label: 'Bayi', value: bayiCount, icon: '👶', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
      { label: 'Lansia', value: lansiaCount, icon: '👵', bgColor: 'bg-teal-100', textColor: 'text-teal-700' },
    ];

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { posyandu } = req.query;
    const whereClause = posyandu ? { posyandu } : {};

    const userCount = await User.count({ where: { ...whereClause, role: 'user' } });
    const kaderCount = await User.count({ where: { ...whereClause, role: 'kader' } });
    const dokterCount = await Dokter.count();
    const waliCount = await Wali.count({ where: { ...whereClause } });
    const kegiatanCount = await Kegiatan.count({ where: { ...whereClause } });
    const orangtuaCount = await OrangTua.count({ where: { ...whereClause } });
    const bayiCount = await Bayi.count({ where: { ...whereClause } });
    const lansiaCount = await Lansia.count({ where: { ...whereClause } });

    const stats = [
      { label: 'User', value: userCount, icon: '👤', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
      { label: 'Kegiatan', value: kegiatanCount, icon: '📅', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
      { label: 'Kader', value: kaderCount, icon: '👩‍⚕️', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
      { label: 'Dokter', value: dokterCount, icon: '🩺', bgColor: 'bg-red-100', textColor: 'text-red-700' },
      { label: 'Wali', value: waliCount, icon: '👨‍👩‍👧‍👦', bgColor: 'bg-orange-100', textColor: 'text-orange-700' },
      { label: 'Orangtua', value: orangtuaCount, icon: '🧑‍🤝‍🧑', bgColor: 'bg-green-100', textColor: 'text-green-700' },
      { label: 'Bayi', value: bayiCount, icon: '👶', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
      { label: 'Lansia', value: lansiaCount, icon: '👵', bgColor: 'bg-teal-100', textColor: 'text-teal-700' },
    ];

    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;