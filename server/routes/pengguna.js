// Import necessary modules and models
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Pengguna = require('../models/pengguna');
const OrangTua = require('../models/orangtua');
const Wali = require('../models/wali');
const Posyandu = require('../models/posyandu');
const { authenticateToken, authorizeRoles } = require('./middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET;

// Create new Pengguna (admin only)
router.post('/', async (req, res) => {
    try {
        const {
            nama, email, kata_sandi, role, no_hp, no_kk, no_ktp, foto_kk, orangtua, wali, posyandu
        } = req.body;

        const hashedPassword = await bcrypt.hash(kata_sandi, 10);
        const newUser = await Pengguna.create({
            nama,
            email,
            kata_sandi: hashedPassword,
            role,
            no_hp,
            no_kk,
            no_ktp,
            foto_kk,
            orangtua,
            wali,
            posyandu
        });

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { no_hp, kata_sandi } = req.body;
        const user = await Pengguna.findOne({ where: { no_hp } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid No Handphone or Password' });
        }

        const isPasswordValid = await bcrypt.compare(kata_sandi, user.kata_sandi);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid No Handphone or Password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role, userName: user.nama, userNoHp: user.no_hp, userId: user.id, userPosyandu: user.posyandu });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Get all pengguna
router.get('/', authenticateToken, async (req, res) => {
    try {
      const users = await Pengguna.findAll({
        include: [
            { model: OrangTua, as: 'orangTuaDetail' },
            { model: Wali, as: 'waliDetail' },
            { model: Posyandu, as: 'posyanduDetail' },
        ]
    });
  
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching pengguna data:', error);
      res.status(500).json({ error: error });
    }
});

// Get pengguna by ID
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const user = await Pengguna.findByPk(req.params.id, {
            include: [
                { model: OrangTua, as: 'orangTuaDetail' },
                { model: Wali, as: 'waliDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
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

router.post('/check-phone', async (req, res) => {
    try {
        const { no_hp } = req.body;
        const user = await Pengguna.findOne({ where: { no_hp } });
        if (user) {
            // If the user with this phone number exists, return exists: true
            return res.status(200).json({ exists: true });
        }
        // Otherwise, return exists: false
        res.status(200).json({ exists: false });
    } catch (error) {
        console.error('Error checking phone number:', error);
        res.status(500).json({ error: 'Failed to check phone number' });
    }
});

router.post('/check-nik', async (req, res) => {
    try {
        const { no_ktp } = req.body;
        const user = await Pengguna.findOne({ where: { no_ktp } });
        if (user) {
            // If the user with this phone number exists, return exists: true
            return res.status(200).json({ exists: true });
        }
        // Otherwise, return exists: false
        res.status(200).json({ exists: false });
    } catch (error) {
        console.error('Error checking phone number:', error);
        res.status(500).json({ error: 'Failed to check phone number' });
    }
});

// Update pengguna by ID
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {
            nama, email, kata_sandi, role, no_hp, no_kk, no_ktp, foto_kk, orangtua, wali, posyandu
        } = req.body;

        const user = await Pengguna.findByPk(req.params.id);
        if (user) {
            user.nama = nama;
            user.email = email;

            if (kata_sandi) {
                user.kata_sandi = await bcrypt.hash(kata_sandi, 10);
            }

            user.role = role;
            user.no_hp = no_hp;
            user.no_kk = no_kk;
            user.no_ktp = no_ktp;
            user.foto_kk = foto_kk;
            user.orangtua = orangtua;
            user.wali = wali;
            user.posyandu = posyandu;
            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Pengguna not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Delete pengguna by ID (admin only)
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

// Get all pengguna with role 'kader'
router.get('/role/kader', authenticateToken, async (req, res) => {
    try {
        const kaderUsers = await Pengguna.findAll({
            where: { role: 'kader' }, 
            include: [
                // { model: OrangTua, as: 'orangTuaDetail' },
                // { model: Wali, as: 'waliDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
            ]
        });
        res.status(200).json(kaderUsers);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;
