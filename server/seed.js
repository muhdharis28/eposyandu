// seed.js
const bcrypt = require('bcrypt');
const User = require('./models/pengguna'); // Adjust the path to your Pengguna model
const Posyandu = require('./models/posyandu'); // Import the Posyandu model
const sequelize = require('./db.config');  // Adjust the path to your Sequelize configuration file

async function seedAdminUser() {
    const nama = 'admin';
    const email = 'admin@example.com';
    const password = '123456'; // Replace with your desired password
    const role = 'admin';
    
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if the admin already exists
        const existingAdmin = await User.findOne({ where: { email } });

        if (existingAdmin) {
            console.log('Admin user already exists.');
            return;
        }

        // Create or find the Posyandu
        const posyandu = await Posyandu.findOrCreate({
            where: { nama: 'Posyandu Example' }, // Replace with the actual Posyandu name
            defaults: {
                alamat: 'Jalan Posyandu No. 1' // Replace with the actual address
            }
        });

        // Create the admin user associated with Posyandu
        await User.create({
            nama,
            email,
            kata_sandi: hashedPassword,
            role,
            no_hp: 1234567890, // Replace with a valid phone number
            no_kk: 1234567890123456, // Replace with a valid KK number
            no_ktp: 1234567890123456, // Replace with a valid KTP number
            foto_kk: null, // Set this to a valid file path if necessary
            orangtua: null, // Link to OrangTua if necessary
            wali: null, // Link to Wali if necessary
            posyandu: posyandu[0].id, // Associate the user with the Posyandu
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        console.log('Admin user created successfully.');
    } catch (error) {
        console.error('Error creating admin user:', error);
    } finally {
        // Close the database connection
        await sequelize.close();
        console.log('Database connection closed.');
    }
}

seedAdminUser();
