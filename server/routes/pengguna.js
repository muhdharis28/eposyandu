const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Pengguna = require('../models/pengguna');
const OrangTua = require('../models/orangtua');
const Wali = require('../models/wali');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET;

// Create a new Pengguna
router.post('/', async (req, res) => {
    try {
        const {
            nama, email, kata_sandi, role, no_hp, no_kk, no_ktp, foto_kk, orangtua, wali
        } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(kata_sandi, 10);

        // Create a new user with the uploaded file path
        const newUser = await Pengguna.create({
            nama,
            email,
            kata_sandi: hashedPassword,
            role,
            no_hp,
            no_kk,
            no_ktp,
            foto_kk, // Path of the uploaded file
            orangtua,
            wali,
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});


// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, kata_sandi } = req.body;

        // Find the user by email
        const user = await Pengguna.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(kata_sandi, user.kata_sandi);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Include the user's role and other relevant data in the response
        res.json({ token, role: user.role, userName: user.nama, userEmail: user.email });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
      // Fetch all Pengguna records
      const users = await Pengguna.findAll();
  
      // Fetch related OrangTua and Wali data for each user
      const usersWithRelations = await Promise.all(
        users.map(async (user) => {
          // Fetch associated OrangTua data
          let orangTua = null;
          if (user.orangtua) {
            orangTua = await OrangTua.findOne({ where: { id: user.orangtua } });
          }
  
          // Fetch associated Wali data
          let wali = null;
          if (user.wali) {
            wali = await Wali.findOne({ where: { id: user.wali } });
          }
  
          // Return user with related data
          return {
            ...user.toJSON(),
            orang_tua: orangTua,
            wali: wali,
          };
        })
      );
  
      res.status(200).json(usersWithRelations);
    } catch (error) {
      console.error('Error fetching pengguna data:', error);
      res.status(500).json({ error: error });
    }
  });

// Read a single Pengguna by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await Pengguna.findByPk(req.params.id, {
            include: [
                { model: OrangTua, as: 'orang_tua' },
                { model: Wali, as: 'wali' }
            ]
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Pengguna not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Update a Pengguna by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {
            nama, email, kata_sandi, role, no_hp, no_kk, no_ktp, foto_kk, orangtua, wali
        } = req.body;

        const user = await Pengguna.findByPk(req.params.id);
        if (user) {
            user.nama = nama;
            user.email = email;

            // Update password if provided
            if (kata_sandi) {
                user.kata_sandi = await bcrypt.hash(kata_sandi, 10);
            }

            user.role = role;
            user.no_hp = no_hp;
            user.no_kk = no_kk;
            user.no_ktp = no_ktp;
            user.foto_kk = foto_kk; // Updated file path
            user.orangtua = orangtua;
            user.wali = wali;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Pengguna not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Delete a Pengguna by ID (only for admins)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const user = await Pengguna.findByPk(req.params.id);
        if (user) {
            await user.destroy();
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Pengguna not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;