const express = require('express');
const router = express.Router();
const User = require('../models/pengguna');
const Kegiatan = require('../models/kegiatan');
const OrangTua = require('../models/orangtua');
const Bayi = require('../models/balita');
const Lansia = require('../models/lansia');

router.get('/', async (req, res) => {
  try {
    const userCount = await User.count({ where: { role: 'user' } });
    const kaderCount = await User.count({ where: { role: 'kader' } });
    const kegiatanCount = await Kegiatan.count();
    const orangtuaCount = await OrangTua.count();
    const bayiCount = await Bayi.count();
    const lansiaCount = await Lansia.count();

    const stats = [
      { label: 'User', value: userCount, icon: '👤', bgColor: 'bg-purple-100', textColor: 'text-purple-700' },
      { label: 'Kegiatan', value: kegiatanCount, icon: '📅', bgColor: 'bg-blue-100', textColor: 'text-blue-700' },
      { label: 'Kader', value: kaderCount, icon: '👩‍⚕️', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
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