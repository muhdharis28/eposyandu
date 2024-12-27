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

router.post('/', async (req, res) => {
    try {
        const {
            nama, email, kata_sandi, role, no_hp, no_kk, no_ktp, foto_kk, orangtua, wali, posyandu, verifikasi
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
            posyandu,
            verifikasi
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { no_hp, kata_sandi } = req.body;

        const user = await Pengguna.findOne({
            where: { no_hp },
            include: [
                {
                    model: Posyandu,
                    as: 'posyanduDetail',
                    attributes: ['nama'],
                }
            ]
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid No Handphone or Password' });
        }

        const isPasswordValid = await bcrypt.compare(kata_sandi, user.kata_sandi);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid No Handphone or Password' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role, posyanduId: user.posyandu },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            role: user.role,
            userName: user.nama,
            userId: user.id,
            userPosyanduId: user.posyandu,
            userPosyanduName: user.posyanduDetail ? user.posyanduDetail.nama : null
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role; 
        const { orangtua, wali } = req.query;

        const filterCondition = {
            include: [
                { model: OrangTua, as: 'orangTuaDetail' },
                { model: Wali, as: 'waliDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
            ],
            where: {}
        };

    
        if (userRole !== 'admin') {
            filterCondition.where.posyandu = posyanduId;
        }

    
        if (orangtua) {
            filterCondition.where.orangtua = orangtua;
        }
        if (wali) {
            filterCondition.where.wali = wali;
        }

        const users = await Pengguna.findAll(filterCondition);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role; 
        console.log(req.user.posyanduId)
        const filterCondition = {
            include: [
                { model: OrangTua, as: 'orangTuaDetail' },
                { model: Wali, as: 'waliDetail' },
                { model: Posyandu, as: 'posyanduDetail' },
            ]
        };

    
        if (userRole !== 'admin') {
            filterCondition.where = { posyandu: posyanduId };
        }

        const user = await Pengguna.findByPk(req.params.id, filterCondition);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Pengguna not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/check-phone', async (req, res) => {
    try {
        const { no_hp } = req.body;
        const user = await Pengguna.findOne({ where: { no_hp } });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to check phone number' });
    }
});

router.post('/check-nik', async (req, res) => {
    try {
        const { no_ktp } = req.body;
        const user = await Pengguna.findOne({ where: { no_ktp } });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to check NIK' });
    }
});

router.get('/orangtua', async (req, res) => {
    try {
        console.log('Fetching user by orangtua ID');
        const { orangtua } = req.query;
        if (!orangtua) {
            return res.status(400).json({ error: 'Orangtua ID is required' });
        }

        const user = await Pengguna.findOne({ where: { orangtua } });
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by orangtua ID:', error);
        res.status(500).json({ error: 'Failed to get Orangtua' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const {
            nama, email, kata_sandi, role, no_hp, no_kk, no_ktp, foto_kk, orangtua, wali, posyandu
        } = req.body;
        const posyanduId = req.user.posyanduId;
        const userRole = req.user.role;
        const user = await Pengguna.findByPk(req.params.id);
        
        if (user && (userRole === 'admin' || user.posyandu === posyanduId)) {
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
            res.status(404).json({ error: 'Pengguna not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:id/orangtua', authenticateToken, async (req, res) => {
    try {
        const { orangtua } = req.body;
        const posyanduId = req.user.posyanduId;
        const user = await Pengguna.findByPk(req.params.id);
        
        if (user && user.posyandu === posyanduId) {
        
            console.log('555',orangtua)
            user.orangtua = orangtua;
            await user.save();

            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Pengguna not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:id/wali', authenticateToken, async (req, res) => {
    try {
        const { wali } = req.body;
        const posyanduId = req.user.posyanduId;
        const user = await Pengguna.findByPk(req.params.id);

        if (user && user.posyandu === posyanduId) {
        
            user.wali = wali;
            await user.save();

            res.status(200).json(user);
        } else {
            res.status(404).json({ error: 'Pengguna not found or unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/:id/verifikasi', authenticateToken, async (req, res) => {
    try {
        const user = await Pengguna.findByPk(req.params.id);

        user.verifikasi = true;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
    try {
        
        const user = await Pengguna.findByPk(req.params.id);
        await user.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/role/kader', authenticateToken, async (req, res) => {
    try {
        const posyanduId = req.user.posyanduId;

        const kaderUsers = await Pengguna.findAll({
            where: { role: 'kader', posyandu: posyanduId },
            include: [
                { model: Posyandu, as: 'posyanduDetail' },
            ]
        });
        res.status(200).json(kaderUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
