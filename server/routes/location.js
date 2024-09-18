const express = require('express');
const router = express.Router();
const indonesia = require('../indonesia.json'); // Import the JSON data

// Get all provinces
router.get('/provinsi', (req, res) => {
  try {
    const provinces = indonesia;
    res.json(provinces);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving provinces' });
  }
});

// Get regencies by province ID
router.get('/provinsi/:id/regencies', (req, res) => {
  const { id } = req.params;
  const province = indonesia.find(prov => prov.id === id);

  if (province) {
    res.json(province.regencies);
  } else {
    res.status(404).json({ message: 'Province not found' });
  }
});

// Get districts by regency ID
router.get('/regencies/:id/districts', (req, res) => {
  const { id } = req.params;
  let found = null;

  indonesia.forEach(province => {
    const regency = province.regencies.find(reg => reg.id === id);
    if (regency) {
      found = regency;
    }
  });

  if (found) {
    res.json(found.districts);
  } else {
    res.status(404).json({ message: 'Regency not found' });
  }
});

// Get villages by district ID
router.get('/districts/:id/villages', (req, res) => {
  const { id } = req.params;
  let found = null;

  indonesia.forEach(province => {
    province.regencies.forEach(regency => {
      const district = regency.districts.find(dist => dist.id === id);
      if (district) {
        found = district;
      }
    });
  });

  if (found) {
    res.json(found.villages);
  } else {
    res.status(404).json({ message: 'District not found' });
  }
});

module.exports = router;
