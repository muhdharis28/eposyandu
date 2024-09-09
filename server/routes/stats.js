// routes/stats.js
const express = require('express');
const router = express.Router();
const User = require('../models/pengguna'); // Import the User model
const Kegiatan = require('../models/kegiatan'); // Import the Kegiatan model

// Sample data for other stats
const otherStats = [
  { label: 'Kader', value: 4, icon: '👩‍⚕️', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
  { label: 'Orangtua', value: 3, icon: '🧑‍🤝‍🧑', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  { label: 'Bayi', value: 5, icon: '👶', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' },
  { label: 'Lansia', value: 4, icon: '👵', bgColor: 'bg-teal-100', textColor: 'text-teal-700' },
];

// Endpoint to get stats
router.get('/', async (req, res) => {
  try {
    // Fetch the count of users from the 'pengguna' table
    const userCount = await User.count();

    // Fetch the count of kegiatan from the 'kegiatan' table
    const kegiatanCount = await Kegiatan.count();

    // Create the user stats object
    const userStat = {
      label: 'User',
      value: userCount,
      icon: '👤',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
    };

    // Create the kegiatan stats object
    const kegiatanStat = {
      label: 'Kegiatan',
      value: kegiatanCount,
      icon: '📅',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-700',
    };

    // Combine userStat, kegiatanStat with otherStats
    const stats = [userStat, kegiatanStat, ...otherStats];

    // Send the combined stats as a response
    res.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
